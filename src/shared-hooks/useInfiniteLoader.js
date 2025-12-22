/* eslint-disable no-mixed-spaces-and-tabs */
import { useWebApiAsync } from "@/shared-hooks";
import {
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";
import Arrays from "../shared-modules/Arrays";
import useDebounce from "./useDebounce";
import ConsoleStyles from "@/shared-modules/ConsoleStyles.mjs";
import Objects from "@/shared-modules/Objects.mjs";
import Maps from "@/shared-modules/Maps.mjs";

export const useInfiniteLoader = (props = {}) => {
	const {
		url,
		params: baseParams,
		bearer,
		initialFetchSize = 50,
		debounce = 0,
	} = props;

	// const crud = useContext(CrudContext);
	const context = useContext(InfiniteLoaderContext);

	const loadingMap = useMemo(() => new Object(), []);
	const [saveKey, setSaveKey] = useState();
	const [state, setState] = useState({
		listLoading: null,
	});

	const [itemCount, setItemCount] = useState(0);
	const [listError, setListError] = useState();
	const debouncedListLoading = useDebounce(state.listLoading, debounce);
	const [listData, setListData] = useState();

	// Map 方案
	// const listMapRef = useRef(new Map());
	// const listMap = listMapRef.current;
	// useEffect(() => {
	// 	return () => {
	// 		listMap.clear(); // unmount 時自動清空
	// 	};
	// }, [listMap]);

	// const [listItems, setListItems] = useState();
	const [viewportState, setViewportState] = useState({
		visibleStartIndex: 0,
		visibleStopIndex: 0,
		bottomReached: false,
	});

	const { httpGetAsync } = useWebApiAsync();

	const defaultGetItems = useCallback((payload) => {
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
				// debug 用請勿刪除
				// console.log(
				// 	`onItemsRendered(${visibleStartIndex}, ${visibleStopIndex})`
				// );
				if (!onItemsRendered) {
					console.warn(
						"%conItemsRendered 未指定",
						ConsoleStyles.WARN
					);
				}
				onItemsRendered({
					visibleStartIndex,
					visibleStopIndex,
					...rest,
				});
			},
		[itemCount]
	);

	/**
	 * 必須使用 listLoaderCtx.paramsRef 來避免 re-render
	 */
	const loadList = useCallback(
		async ({
			start,
			stop,
			saveKey,
			params,
			getItems = defaultGetItems,
			getSaveKey = defaultGetSaveKey,
			getItemCount = defaultGetItemCount,
			refresh = false,
			// usePrevParams = false,
			supressLoading = false,
			// reset = false,
		} = {}) => {
			let startIndex = start !== undefined ? start : 0;
			let stopIndex =
				stop !== undefined ? stop : startIndex + initialFetchSize;

			if (refresh) {
				Object.keys(loadingMap).forEach((key) => {
					delete loadingMap[key];
				});
				console.log("loadingMap cleared", loadingMap);
			}

			for (let i = startIndex; i <= stopIndex; i++) {
				loadingMap[i] = true;
			}

			let activeParams;
			if (!context) {
				console.warn(
					"InfiniteLoaderContext not found, params cannot be memorized"
				);
				activeParams = params;
			} else {
				if (refresh) {
					activeParams = context.paramsRef?.current;
				} else {
					context.paramsRef.current = params;
					activeParams = params;
				}
			}

			console.log(
				`loadList(${startIndex} ~ ${stopIndex}), params:`,
				activeParams
			);
			if (saveKey) {
				console.log("saveKey", saveKey);
			}

			const loading = refresh && !supressLoading;
			// (refresh || Maps.isEmpty(listMap)) && !supressLoading;
			console.log("loading", loading);

			setListError(null);
			setState((prev) => ({
				...prev,
				listLoading: loading,
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
					setSaveKey(newSaveKey);

					const itemCount = getItemCount(payload);
					if (itemCount !== undefined) {
						setItemCount(itemCount);
					}
					const partialListItems = getItems(payload);
					const partialListData = Arrays.toObject(
						partialListItems,
						start
					);
					// listData
					// console.log("newData", newData);

					if (refresh) {
						setListData(partialListData);
						// setListItems(listItems);
						// Maps.addEntries(listMap, partialListData, {
						// 	clear: true,
						// });
					} else {
						setListData((prev) => ({
							...prev,
							...partialListData,
						}));
						// Maps.addEntries(listMap, partialListData);
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
					listLoading: false,
				}));
			}
		},
		[
			defaultGetItems,
			defaultGetSaveKey,
			defaultGetItemCount,
			initialFetchSize,
			context,
			loadingMap,
			httpGetAsync,
			bearer,
			url,
			baseParams,
		]
	);

	const refreshList = useCallback(() => {
		if (state.listLoading === null) {
			loadList();
		}
	}, [loadList, state.listLoading]);

	const clearListLoading = useCallback(() => {
		setState((prev) => ({
			...prev,
			listLoading: null,
		}));
	}, []);

	const loadMoreItems = useCallback(
		(start, stop) => {
			console.log(`loadMoreItems(${start}, ${stop})`);

			return new Promise((resolve) => {
				loadList({
					start,
					stop,
					refresh: false,
					...(saveKey && {
						saveKey: saveKey,
					}),
				});
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

	const listFiltered = useMemo(() => {
		return false;
	}, []);

	const debouncedListLoadingValue = useMemo(
		() => (debounce === 0 ? state.listLoading : debouncedListLoading),
		[debounce, debouncedListLoading, state.listLoading]
	);

	const getIndexById = useCallback(
		({ key, id }) => {
			if (!listData) {
				return null;
			}
			const entry = Object.entries(listData).find(
				([_, value]) => value[key] === id
			);
			const index = entry ? parseInt(entry[0], 10) : null;
			return index;
		},
		[listData]
	);

	/**
	 * 尋找緊鄰的 id
	 */
	const findAdjacentId = useCallback(
		({ key, id, reverse = false } = {}) => {
			const entry = Object.entries(listData).find(
				([_, value]) => value[key] === id
			);
			const index = entry ? parseInt(entry[0], 10) : null;
			if (index !== null && !isNaN(index)) {
				const nextIndex = reverse ? index - 1 : index + 1;
				const nextRowData = listData[nextIndex];
				if (nextRowData) {
					return nextRowData[key];
				}
			}
			return null;
		},
		[listData]
	);

	const findNextId = useCallback(
		({ ...opts }) => {
			return findAdjacentId({ ...opts });
		},
		[findAdjacentId]
	);

	const findPrevId = useCallback(
		({ key, id }) => {
			return findAdjacentId({ key, id, reverse: true });
		},
		[findAdjacentId]
	);

	// checkbox 支援
	const getItemDataByIndex = useCallback(
		(indexes) => {
			return indexes.map((i) => listData[i]);
		},
		[listData]
	);

	return {
		// PROPS
		saveKey,
		listData,
		// listMapRef,
		// listItems,
		...state,
		debouncedListLoading: debouncedListLoadingValue,
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
		findNextId,
		findPrevId,
		getIndexById,
		// checkbox
		getItemDataByIndex,
	};
};
