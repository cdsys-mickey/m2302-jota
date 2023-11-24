/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useMemo } from "react";
import Arrays from "../shared-modules/md-arrays";

export const useInfiniteLoader = (props = {}) => {
	const { url, params, bearer, initialFetchSize = 50 } = props;
	const loadedMap = useMemo(() => new Set(), []);
	// const [itemLoading, setItemLoading] = useState({});
	const [saveKey, setSaveKey] = useState(null);
	const [itemCount, setItemCount] = useState(0);
	const [listLoading, setListLoading] = useState(true);
	const [data, setData] = useState({});
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

	const isItemLoading = useCallback(
		(index) => {
			return !loadedMap[index];
		},
		[loadedMap]
	);
	// const isItemLoading = useCallback(
	// 	(index) => {
	// 		return itemLoading[index];
	// 	},
	// 	[itemLoading]
	// );

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

	const loadItems = useCallback(
		async ({
			start,
			stop,
			extraParams,
			getData = defaultGetData,
			getSaveKey = defaultGetSaveKey,
			getItemCount = defaultGetItemCount,
		} = {}) => {
			// if (start !== undefined && stop !== undefined) {
			// 	for (let i = start; i <= stop; i++) {
			// 		loadedMap[i] = false;
			// 	}
			// }

			let startIndex = start !== undefined ? start : 0;
			let stopIndex =
				stop !== undefined ? stop : startIndex + initialFetchSize;

			for (let i = startIndex; i <= stopIndex; i++) {
				loadedMap[i] = false;
			}

			console.debug(`load(${startIndex} ~ ${stopIndex})`);

			try {
				const { status, payload, error } = await httpGetAsync({
					url: url,
					// data:
					// 	start !== undefined
					// 		? {
					// 				...params,
					// 				...extraParams,
					// 				st: start,
					// 				ed: end,
					// 				sk: saveKey,
					// 		  }
					// 		: {
					// 				...params,
					// 				...extraParams,
					// 				sz: initialFetchSize,
					// 		  },
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
					// setData((prev) => [
					// 	...prev,
					// 	...(getData ? getData(payload) : payload),
					// ]);
					// setData((prev) => ({
					// 	...prev,
					// 	...(getData
					// 		? Arrays.toObject(getData(payload), start)
					// 		: payload),
					// }));

					const newData = Arrays.toObject(getData(payload), start);
					console.debug("newData", newData);

					setData((prev) => ({
						...prev,
						...(getData
							? Arrays.toObject(getData(payload), start)
							: payload),
					}));
					for (let i = startIndex; i <= stopIndex; i++) {
						loadedMap[i] = true;
					}

					// setItemLoading((prev) => ({
					// 	...prev,
					// 	...Arrays.rangeToObject(startIndex, stopIndex, false),
					// }));
					// if (start !== undefined && stop !== undefined) {
					// 	for (let i = start; i <= stop; i++) {
					// 		loadedMap[i] = true;
					// 	}
					// }
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
			loadedMap,
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
				loadItems({ start, stop });
				resolve();
			});
		},
		[loadItems]
	);

	const isItemLoaded = useCallback(
		(index) => {
			// console.debug(`isItemLoaded(${index})`);
			return loadedMap[index] === true;
		},
		[loadedMap]
	);

	return {
		loadItems,
		data,
		listLoading,
		isItemLoading,
		//
		itemCount,
		isItemLoaded,
		loadMoreItems,
		handleItemsRendered,
		...viewportState,
	};
};
