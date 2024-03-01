/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useMemo } from "react";
import Arrays from "../shared-modules/sd-arrays";
import useDebounce from "./useDebounce";
import { useRef } from "react";
import { useContext } from "react";
import CrudContext from "../contexts/crud/CrudContext";

export const useInfiniteLoader = (props = {}) => {
	const {
		url,
		params: baseParams,
		bearer,
		initialFetchSize = 50,
		debounce = 0,
	} = props;

	const crud = useContext(CrudContext);

	const loadingMap = useMemo(() => new Set(), []);

	const [state, setState] = useState({
		saveKey: null,
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
			useLastParams = false,
			disableLoading = false,
			// reset = false,
		} = {}) => {
			let startIndex = start !== undefined ? start : 0;
			let stopIndex =
				stop !== undefined ? stop : startIndex + initialFetchSize;

			for (let i = startIndex; i <= stopIndex; i++) {
				loadingMap[i] = true;
			}

			let activeParams;
			if (crud?.paramsRef) {
				if (useLastParams) {
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

			const loading = !saveKey && !disableLoading;

			setListError(null);
			setState((prev) => ({
				...prev,
				forceLoading: !!saveKey,
				// ...(!saveKey && {
				// 	loading: true,
				// }),
				loading,
			}));
			// setForceLoading(!!saveKey);
			// if (!saveKey) {
			// 	setLoading(true);
			// }
			try {
				const { status, payload, error } = await httpGetAsync({
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
					// console.log("newData", newData);

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

	const loadMoreItems = useCallback(
		(start, stop) => {
			console.log(`loadMoreItems(${start}, ${stop})`);

			return new Promise((resolve) => {
				loadList({ start, stop, saveKey: state.saveKey });
				resolve();
			});
		},
		[loadList, state.saveKey]
	);

	const isItemLoading = useCallback(
		(index) => {
			return loadingMap[index] === true;
		},
		[loadingMap]
	);

	const isItemLoaded = useCallback(
		(index) => {
			// console.log(`isItemLoaded(${index})`);
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
	};
};
