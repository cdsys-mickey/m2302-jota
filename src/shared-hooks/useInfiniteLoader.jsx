/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useMemo } from "react";
import Arrays from "../shared-modules/sd-arrays";
import useDebounce from "./useDebounce";
import { useContext } from "react";
import CrudContext from "../contexts/crud/CrudContext";
import { v4 as uuidv4 } from "uuid";

export const useInfiniteLoader = (props = {}) => {
	const {
		url,
		params: baseParams,
		bearer,
		initialFetchSize = 50,
		debounce = 0,
	} = props;

	const crud = useContext(CrudContext);

	// const loadingMap = useMemo(() => new Set(), []);
	const loadingMap = useMemo(() => new Object(), []);
	const [saveKey, setSaveKey] = useState();
	const [state, setState] = useState({
		loading: null,
		forceLoading: false,
	});

	const [itemCount, setItemCount] = useState(0);
	const [listError, setListError] = useState();
	const debouncedLoading = useDebounce(state.loading, debounce);
	const [listData, setListData] = useState({});
	const [viewportState, setViewportState] = useState({
		visibleStartIndex: 0,
		visibleStopIndex: 0,
		bottomReached: false,
	});

	const { httpGetAsync } = useWebApi();

	const defaultGetData = useCallback((payload) => {
		return payload["data"] || [];
	}, []);

	const defaultGetSaveKey = useCallback((payload) => {
		return payload?.Select?.SaveKey;
	}, []);

	const defaultGetItemCount = useCallback((payload) => {
		return payload?.Select?.TotalRecord;
	}, []);

	const handleItemsRendered = useCallback(
		(onItemsRendered) =>
			({ visibleStartIndex, visibleStopIndex, ...rest }) => {
				setViewportState({
					visibleStartIndex,
					visibleStopIndex,
					bottomReached: visibleStopIndex === itemCount - 1,
				});
				// console.log(
				// 	`onItemsRendered(${visibleStartIndex}, ${visibleStopIndex})`
				// );
				onItemsRendered({
					visibleStartIndex,
					visibleStopIndex,
					...rest,
				});
			},
		[itemCount]
	);

	/**
	 * 必須使用 crud.paramsRef 來避免 re-render
	 */
	const loadList = useCallback(
		async ({
			start,
			stop,
			saveKey,
			params,
			getData = defaultGetData,
			getSaveKey = defaultGetSaveKey,
			getItemCount = defaultGetItemCount,
			refresh = false,
			disableLoading = false,
			// reset = false,
		} = {}) => {
			let startIndex = start !== undefined ? start : 0;
			let stopIndex =
				stop !== undefined ? stop : startIndex + initialFetchSize;

			if (refresh) {
				// loadingMap.clear();
				Object.keys(loadingMap).forEach((key) => {
					// 删除对象的属性
					delete loadingMap[key];
				});
				// console.log("loadingMap cleared", loadingMap);
			}

			for (let i = startIndex; i <= stopIndex; i++) {
				loadingMap[i] = true;
			}

			// console.log("loadingMap before", loadingMap);

			let activeParams;
			if (crud?.paramsRef) {
				if (refresh) {
					activeParams = crud.paramsRef.current;
				} else {
					crud.paramsRef.current = params;
					activeParams = params;
				}
			}

			console.log(
				`load(${startIndex} ~ ${stopIndex}), params:`,
				activeParams
			);

			const loading = (!start && !disableLoading) || refresh;

			setListError(null);
			setState((prev) => ({
				...prev,
				forceLoading: !!saveKey,
				loading,
			}));
			try {
				const { status, payload, error } = await httpGetAsync({
					bearer: bearer,
					url: url,
					params: {
						...baseParams,
						...activeParams,
						st: startIndex,
						sp: stopIndex,
						...(saveKey && {
							sk: saveKey,
						}),
					},
				});
				if (status.success) {
					const newSaveKey = getSaveKey(payload);

					// setState((prev) => ({
					// 	...prev,
					// 	// saveKey: getSaveKey(payload),
					// 	saveKey:
					// (!startIndex || refresh) && !newSaveKey
					// 	? uuidv4()
					// 	: newSaveKey,
					// }));
					setSaveKey(
						(!startIndex || refresh) && !newSaveKey
							? uuidv4()
							: newSaveKey
					);
					const itemCount = getItemCount(payload);
					if (itemCount !== undefined) {
						setItemCount(itemCount);
					}
					const newData = getData(payload);
					const newDataObj = Arrays.toObject(newData, start);
					// console.log("newData", newData);

					if (refresh) {
						// setListData({
						// 	...newData,
						// });
						setListData(newDataObj);
					} else {
						setListData((prev) => ({
							...prev,
							...newDataObj,
						}));
					}
					console.log(`mark ${startIndex}~${stopIndex} as loaded`);
					for (let i = startIndex; i <= stopIndex; i++) {
						loadingMap[i] = false;
					}
					// console.log("loadingMap after", loadingMap);
				} else {
					throw error;
				}
			} catch (err) {
				console.error(err);
				setListError(err);
			} finally {
				// setLoading(false);
				setState((prev) => ({
					...prev,
					loading: false,
				}));
			}
		},
		[
			defaultGetData,
			defaultGetSaveKey,
			defaultGetItemCount,
			initialFetchSize,
			crud?.paramsRef,
			loadingMap,
			httpGetAsync,
			url,
			baseParams,
			bearer,
		]
	);

	const refreshList = useCallback(() => {
		if (state.loading === null) {
			loadList();
		}
	}, [loadList, state.loading]);

	const clearListLoading = useCallback(() => {
		setState((prev) => ({
			...prev,
			loading: null,
		}));
	}, []);

	const loadMoreItems = useCallback(
		(start, stop) => {
			console.log(`loadMoreItems(${start}, ${stop})`);

			return new Promise((resolve) => {
				// loadList({ start, stop, saveKey: state.saveKey });
				loadList({ start, stop, saveKey: saveKey });
				resolve();
			});
		},
		[loadList, saveKey]
	);

	const isItemLoading = useCallback(
		(index) => {
			return loadingMap[index] === true;
		},
		[loadingMap]
	);

	const isItemLoaded = useCallback(
		(index) => {
			// console.log(`isItemLoaded(${index})`, loadingMap[index] === false);
			return loadingMap[index] === false;
		},
		[loadingMap]
	);

	// const listLoading = useMemo(() => {
	// 	return forceLoading ? loading : debouncedLoading;
	// }, [debouncedLoading, forceLoading, loading]);
	const listLoading = useMemo(() => {
		return state.forceLoading || debounce === 0
			? state.loading
			: debouncedLoading;
	}, [debounce, debouncedLoading, state.forceLoading, state.loading]);

	const listFiltered = useMemo(() => {
		return false;
	}, []);

	return {
		// PROPS
		saveKey,
		listData,
		listLoading,
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
		refreshList,
		clearListLoading,
	};
};
