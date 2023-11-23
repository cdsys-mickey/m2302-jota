/* eslint-disable no-mixed-spaces-and-tabs */
import { useCallback, useState } from "react";
import { useWebApi } from "@/shared-hooks/useWebApi";
import { useMemo } from "react";

export const useInfiniteLoader = (props) => {
	const { url, params, bearer, initialFetchSize = 50 } = props;
	const loadedMap = useMemo(() => new Set(), []);

	const [saveKey, setSaveKey] = useState(null);
	const [itemCount, setItemCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
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

	const load = useCallback(
		async ({
			start,
			end,
			extraParams,
			getData = defaultGetData,
			getSaveKey = defaultGetSaveKey,
			getItemCount = defaultGetItemCount,
		} = {}) => {
			if (start !== undefined && end !== undefined) {
				for (let i = start; i <= end; i++) {
					loadedMap[i] = false;
				}
			}

			try {
				const { status, payload, error } = await httpGetAsync({
					url: url,
					data:
						start !== undefined
							? {
									...params,
									...extraParams,
									st: start,
									ed: end,
									sk: saveKey,
							  }
							: {
									...params,
									...extraParams,
									sz: initialFetchSize,
							  },
					bearer: bearer,
				});
				if (status.success) {
					setSaveKey(getSaveKey(payload));
					setItemCount(getItemCount(payload));
					setData((prev) => [
						...prev,
						...(getData ? getData(payload) : payload),
					]);
					if (start !== undefined && end !== undefined) {
						for (let i = start; i <= end; i++) {
							loadedMap[i] = true;
						}
					}
				} else {
					throw error;
				}
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		},
		[
			bearer,
			defaultGetData,
			defaultGetSaveKey,
			defaultGetItemCount,
			httpGetAsync,
			initialFetchSize,
			loadedMap,
			params,
			saveKey,
			url,
		]
	);

	const loadMoreItems = useCallback(
		(start, end) => {
			console.debug(`loadMoreItems(${start}, ${end})`);

			return new Promise((resolve) => {
				load({ start, end });
				resolve();
			});
		},
		[load]
	);

	const isItemLoaded = useCallback(
		(index) => {
			// console.debug(`isItemLoaded(${index})`);
			return loadedMap[index] === true;
		},
		[loadedMap]
	);

	return {
		load,
		data,
		loading,
		isItemLoading,
		//
		itemCount,
		isItemLoaded,
		loadMoreItems,
		handleItemsRendered,
		...viewportState,
	};
};
