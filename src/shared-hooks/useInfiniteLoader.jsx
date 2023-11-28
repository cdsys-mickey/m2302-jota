/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useMemo } from "react";
import Arrays from "../shared-modules/md-arrays";

export const useInfiniteLoader = (props = {}) => {
	const { url, params, bearer, initialFetchSize = 50 } = props;
	const loadingMap = useMemo(() => new Set(), []);
	// const [itemLoading, setItemLoading] = useState({});
	const [saveKey, setSaveKey] = useState(null);
	const [itemCount, setItemCount] = useState(0);
	const [listLoading, setListLoading] = useState(true);
	const [listData, setListData] = useState({});
	const [viewportState, setViewportState] = useState({
		visibleStartIndex: 0,
		visibleStopIndex: 0,
	});

	const { httpGetAsync } = useWebApi();

	const defaultGetData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const defaultGetSaveKey = useCallback((payload) => {
		return payload["Select"]["SaveKey"];
	}, []);

	const defaultGetItemCount = useCallback((payload) => {
		return payload["Select"]["TotalRecord"];
	}, []);

	const handleItemsRendered = useCallback(
		(onItemsRendered) =>
			({ visibleStartIndex, visibleStopIndex, ...rest }) => {
				setViewportState({
					visibleStartIndex,
					visibleStopIndex,
				});
				onItemsRendered({
					visibleStartIndex,
					visibleStopIndex,
					...rest,
				});
			},
		[]
	);

	const loadList = useCallback(
		async ({
			start,
			stop,
			extraParams,
			getData = defaultGetData,
			getSaveKey = defaultGetSaveKey,
			getItemCount = defaultGetItemCount,
		} = {}) => {
			let startIndex = start !== undefined ? start : 0;
			let stopIndex =
				stop !== undefined ? stop : startIndex + initialFetchSize;

			for (let i = startIndex; i <= stopIndex; i++) {
				loadingMap[i] = true;
			}

			console.debug(`load(${startIndex} ~ ${stopIndex})`);

			try {
				const { status, payload, error } = await httpGetAsync({
					url: url,
					data: {
						...params,
						...extraParams,
						st: startIndex,
						sp: stopIndex,
						...(saveKey && {
							sk: saveKey,
						}),
					},
					bearer: bearer,
				});
				if (status.success) {
					setSaveKey(getSaveKey(payload));
					setItemCount(getItemCount(payload));

					const newData = Arrays.toObject(getData(payload), start);
					console.debug("newData", newData);

					setListData((prev) => ({
						...prev,
						...(getData
							? Arrays.toObject(getData(payload), start)
							: payload),
					}));
					for (let i = startIndex; i <= stopIndex; i++) {
						loadingMap[i] = false;
					}
				} else {
					throw error;
				}
			} catch (err) {
				console.error(err);
			} finally {
				setListLoading(false);
			}
		},
		[
			defaultGetData,
			defaultGetSaveKey,
			defaultGetItemCount,
			initialFetchSize,
			loadingMap,
			httpGetAsync,
			url,
			params,
			saveKey,
			bearer,
		]
	);

	const loadMoreItems = useCallback(
		(start, stop) => {
			console.debug(`loadMoreItems(${start}, ${stop})`);

			return new Promise((resolve) => {
				loadList({ start, stop });
				resolve();
			});
		},
		[loadList]
	);

	const isItemLoading = useCallback(
		(index) => {
			return loadingMap[index];
		},
		[loadingMap]
	);

	const isItemLoaded = useCallback(
		(index) => {
			// console.debug(`isItemLoaded(${index})`);
			return loadingMap[index] === false;
		},
		[loadingMap]
	);

	return {
		loadList,
		listData,
		listLoading,
		isItemLoading,
		isItemLoaded,
		//
		itemCount,
		loadMoreItems,
		handleItemsRendered,
		...viewportState,
	};
};
