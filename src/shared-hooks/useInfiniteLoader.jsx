/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useMemo } from "react";
import Arrays from "../shared-modules/sd-arrays";
import useDebounce from "./useDebounce";
import queryString from "query-string";

export const useInfiniteLoader = (props = {}) => {
	const {
		url,
		params: baseParams,
		bearer,
		initialFetchSize = 50,
		debounce = 400,
	} = props;
	const loadingMap = useMemo(() => new Set(), []);
	// const checkedMap = useMemo(() => new Set(), []);
	const [state, setState] = useState({
		saveKey: null,
	});
	// const [saveKey, setSaveKey] = useState(null);
	const [itemCount, setItemCount] = useState(0);
	const [listError, setListError] = useState();
	const [loading, setLoading] = useState(false);
	const [forceLoading, setForceLoading] = useState(false);
	const debouncedLoading = useDebounce(loading, debounce);
	const [listData, setListData] = useState({});
	const [viewportState, setViewportState] = useState({
		visibleStartIndex: 0,
		visibleStopIndex: 0,
	});

	const { httpGetAsync } = useWebApi();

	const defaultGetData = useCallback((payload) => {
		return payload["data"] || [];
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
			saveKey,
			params,
			getData = defaultGetData,
			getSaveKey = defaultGetSaveKey,
			getItemCount = defaultGetItemCount,
			reset = false,
		} = {}) => {
			let startIndex = start !== undefined ? start : 0;
			let stopIndex =
				stop !== undefined ? stop : startIndex + initialFetchSize;

			for (let i = startIndex; i <= stopIndex; i++) {
				loadingMap[i] = true;
			}

			console.debug(`load(${startIndex} ~ ${stopIndex})`);

			// const newParams = reset
			// 	? params
			// 	: {
			// 			...(queryString.parse(listParams)),
			// 			...params,
			// 	  };
			// console.debug(`newParams, reset=${reset}`, newParams);

			setListError(null);
			// const withSaveKey = !reset && !!saveKey;
			const withSaveKey = !!saveKey;
			setForceLoading(reset);
			setLoading(true);
			try {
				const { status, payload, error } = await httpGetAsync({
					url: url,
					data: {
						...baseParams,
						...params,
						// ...newParams,
						st: startIndex,
						sp: stopIndex,
						...(withSaveKey && {
							sk: saveKey,
						}),
					},
					bearer: bearer,
				});
				if (status.success) {
					// setSaveKey(getSaveKey(payload));
					setState((prev) => ({
						...prev,
						saveKey: getSaveKey(payload),
					}));
					setItemCount(getItemCount(payload));

					const newData = Arrays.toObject(getData(payload), start);
					// console.debug("newData", newData);

					setListData((prev) => ({
						...prev,
						...newData,
					}));
					for (let i = startIndex; i <= stopIndex; i++) {
						loadingMap[i] = false;
					}
				} else {
					throw error;
				}
			} catch (err) {
				console.error(err);
				setListError(err);
			} finally {
				setLoading(false);
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
			baseParams,
			bearer,
		]
	);

	const loadMoreItems = useCallback(
		(start, stop) => {
			console.debug(`loadMoreItems(${start}, ${stop})`);

			return new Promise((resolve) => {
				loadList({ start, stop, saveKey: state.saveKey });
				resolve();
			});
		},
		[loadList, state.saveKey]
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

	const listLoading = useMemo(() => {
		return forceLoading ? loading : debouncedLoading;
	}, [debouncedLoading, forceLoading, loading]);

	const listFiltered = useMemo(() => {
		return false;
	}, []);

	return {
		listData,
		listLoading,
		// PROPS
		listFiltered,
		listError,
		itemCount,
		...viewportState,
		// METHODS
		isItemLoaded,
		loadList,
		isItemLoading,
		loadMoreItems,
		handleItemsRendered,
	};
};
