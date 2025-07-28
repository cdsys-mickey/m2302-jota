import { useCallback, useMemo, useState } from "react";
import ActionState from "../shared-constants/action-state";
import { useAction } from "./useAction";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DEFAULT_CANCEL_OPTS = {
	clearParams: false,
};

export const useCrud = () => {
	const paramsRef = useRef({});
	const location = useLocation();
	const navigate = useNavigate();

	const [state, setState] = useState({
		itemId: null,
		itemData: null,
		itemInitialized: false,
	});
	const createAction = useAction();
	const readAction = useAction();
	const updateAction = useAction();
	const deleteAction = useAction();
	const loadAction = useAction();

	const setItemData = useCallback((data) => {
		setState((prev) => ({
			...prev,
			itemData: data,
		}));
	}, []);

	const cancelAction = useCallback(
		(opts = DEFAULT_CANCEL_OPTS) => {
			console.log(`crud.cancelAction`);
			createAction.clear();
			readAction.clear();
			updateAction.clear();
			deleteAction.clear();
			loadAction.clear();

			//清除 itemData
			setState((prev) => ({
				...prev,
				itemInitialized: true,
			}));

			// 清除 id

			// 刪除指定的查詢參數
			if (opts.clearParams && location.search) {
				// 更新 URL，移除查詢參數
				navigate(
					{
						pathname: location.pathname,
						search: "",
					},
					{ replace: true }
				);
			}
		},
		[createAction, deleteAction, loadAction, location.pathname, location.search, navigate, readAction, updateAction]
	);

	const reset = useCallback(() => {
		cancelAction({
			clearParams: true,
		});
	}, [cancelAction]);

	const setOpts = useCallback((opts) => {
		const { id, data, ...rest } = opts || {};
		setState((prev) => ({
			...prev,
			...(id && {
				itemId: id,
			}),
			...(data && {
				itemData: data,
			}),
			itemInitialized: false,
			...rest
		}));
	}, []);

	// CREATE
	const promptCreating = useCallback(
		(opts) => {
			createAction.prompt();
			setOpts(opts);
		},
		[createAction, setOpts]
	);

	const cancelCreating = useCallback(() => {
		createAction.clear();
	}, [createAction]);

	const startCreating = useCallback(
		(message, opts) => {
			createAction.start({ message });
			setOpts(opts);
		},
		[createAction, setOpts]
	);

	const finishedCreating = useCallback(
		(opts) => {
			createAction.clear();
			setOpts(opts);
		},
		[createAction, setOpts]
	);

	const failedCreating = useCallback(
		(err, opts) => {
			createAction.fail({
				error: err
			});
			setOpts(opts);
		},
		[createAction, setOpts]
	);

	const creating = useMemo(() => {
		return !!createAction.state;
	}, [createAction]);

	const createWorking = useMemo(() => {
		return createAction.state === ActionState.WORKING;
	}, [createAction.state]);

	const createFailed = useMemo(() => {
		return createAction.failed || !!createAction.error;
	}, [createAction.error, createAction.failed]);

	// READ
	const startReading = useCallback(
		(message, opts) => {
			console.log(`startReading[${message}]`, opts);
			const { params, ...rest } = opts || {};
			readAction.start({ message, params });
			setOpts(rest);
		},
		[readAction, setOpts]
	);

	const finishedReading = useCallback(
		(opts) => {
			console.log("finishedReading", opts);
			const { params, ...rest } = opts || {};
			readAction.finish({
				params
			});
			setOpts(rest);
		},
		[readAction, setOpts]
	);

	const cancelReading = useCallback(() => {
		readAction.clear();
	}, [readAction]);

	const failedReading = useCallback(
		(err, opts) => {
			console.error("failedReading", err);
			readAction.fail({ error: err });
			setOpts(opts);
		},
		[readAction, setOpts]
	);

	const reading = useMemo(() => {
		return !!readAction.state;
	}, [readAction.state]);

	const readWorking = useMemo(() => {
		return readAction.state === ActionState.WORKING && !readAction.supressLoading;
	}, [readAction.state, readAction.supressLoading]);

	const readingFailed = useMemo(() => {
		return readAction.failed || !!readAction.error;
	}, [readAction.error, readAction.failed]);

	// LOAD
	const startLoading = useCallback(
		(message, opts) => {
			console.log(`startLoading[${message}]`, opts);
			const { params } = opts || {};
			loadAction.start({ message, params });
			setOpts(opts);
		},
		[loadAction, setOpts]
	);

	const finishedLoading = useCallback(
		(opts) => {
			console.log("finishedLoading", opts);
			loadAction.finish();
			setOpts(opts);
		},
		[loadAction, setOpts]
	);

	const cancelLoading = useCallback(() => {
		loadAction.clear();
	}, [loadAction]);

	const failedLoading = useCallback(
		(err, opts) => {
			console.log("failedLoading", err);
			loadAction.fail({ error: err });
			setOpts(opts);
		},
		[loadAction, setOpts]
	);

	const loading = useMemo(() => {
		return !!loadAction.state;
	}, [loadAction.state]);

	const loadWorking = useMemo(() => {
		return loadAction.state === ActionState.WORKING && !loadAction.supressLoading;
	}, [loadAction.state, loadAction.supressLoading]);

	const loadingFailed = useMemo(() => {
		return loadAction.failed || !!loadAction.error;
	}, [loadAction.error, loadAction.failed]);

	// UPDATE
	// 打開編輯器
	const promptUpdating = useCallback(
		(message, opts) => {
			updateAction.prompt({ message });
			setOpts(opts);
		},
		[setOpts, updateAction]
	);

	const startUpdating = useCallback(
		(message, opts) => {
			updateAction.start({ message });
			setOpts(opts);
		},
		[setOpts, updateAction]
	);

	const finishedUpdating = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const cancelUpdating = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const failedUpdating = useCallback(
		(err, opts) => {
			updateAction.fail({ error: err });
			setOpts(opts);
		},
		[setOpts, updateAction]
	);

	// U synth props
	const updating = useMemo(() => {
		return !!updateAction.state;
	}, [updateAction]);

	const updateWorking = useMemo(() => {
		return updateAction.state === ActionState.WORKING;
	}, [updateAction.state]);

	const updatingFailed = useMemo(() => {
		return updateAction.failed || !!updateAction.error;
	}, [updateAction.error, updateAction.failed]);

	// DELETE
	const promptDeleting = useCallback(
		(message, opts) => {
			deleteAction.prompt({ message });
			setOpts(opts);
		},
		[deleteAction, setOpts]
	);

	const startDeleting = useCallback(
		(message, opts) => {
			deleteAction.start({ message });
			setOpts(opts);
		},
		[deleteAction, setOpts]
	);

	const finishedDeleting = useCallback(() => {
		deleteAction.finish();
	}, [deleteAction]);

	const cancelDeleting = useCallback(() => {
		deleteAction.clear();
	}, [deleteAction]);

	const failedDeleting = useCallback(
		(err, opts) => {
			deleteAction.fail({
				error: err
			});
			setOpts(opts);
		},
		[deleteAction, setOpts]
	);

	// D synth props
	const deleting = useMemo(() => {
		return !!deleteAction.state;
	}, [deleteAction.state]);

	const deleteWorking = useMemo(() => {
		return deleteAction.state === ActionState.WORKING;
	}, [deleteAction.state]);

	const deletingFailed = useMemo(() => {
		return deleteAction.failed || !!deleteAction.error;
	}, [deleteAction.error, deleteAction.failed]);

	// 資料已讀取完成，可於表單顯示內容，當使用 refresh 方式更新資料時，這個狀態不會受影響
	const itemDataLoaded = useMemo(() => {
		return !!state.itemData && !readWorking && !loadWorking;
	}, [loadWorking, readWorking, state.itemData]);

	// 資料已就緒 → 代表新資料載入完成，通常是適合觸發 form 載入
	const itemDataReady = useMemo(() => {
		return (
			(loading && loadAction.state !== ActionState.WORKING && !loadingFailed) ||
			(reading && readAction.state !== ActionState.WORKING && !readingFailed) ||
			(creating && readAction.state !== ActionState.WORKING && !readingFailed) ||
			(updating && readAction.state !== ActionState.WORKING && !readingFailed)
		);
	}, [creating, loadAction.state, loading, loadingFailed, readAction.state, reading, readingFailed, updating]);

	const editing = useMemo(() => {
		return !!createAction.state || !!updateAction.state;
	}, [createAction.state, updateAction.state]);

	const editWorking = useMemo(() => {
		return createWorking || updateWorking;
	}, [createWorking, updateWorking]);

	const itemViewOpen = useMemo(() => {
		return reading || creating || updating;
	}, [creating, reading, updating]);

	const cancelEditing = useCallback(() => {
		createAction.clear();
		updateAction.clear();
	}, [createAction, updateAction]);

	return {
		// Common Props/Methods
		...state,
		cancelAction,
		reset,
		setItemData,
		// Create Props
		createMessage: createAction.message,
		createState: createAction.state,
		createError: createAction.error,
		createFailed,
		creating,
		createWorking,
		// CREATE Methods
		promptCreating,
		startCreating,
		finishedCreating,
		cancelCreating,
		failedCreating,
		// READ Props
		readMessage: readAction.message,
		readState: readAction.state,
		readError: readAction.error,
		readingFailed,
		reading,
		readWorking,
		// READ Methods
		startReading,
		finishedReading,
		cancelReading,
		failedReading,
		// LOAD Props
		loadMessage: loadAction.message,
		loadState: loadAction.state,
		loadError: loadAction.error,
		loadingFailed,
		loading,
		loadWorking,
		// LOAD Methods
		startLoading,
		finishedLoading,
		cancelLoading,
		failedLoading,
		// UPDATE Props
		updateMessage: updateAction.message,
		updateState: updateAction.state,
		updateError: updateAction.error,
		updatingFailed,
		updating,
		updateWorking,
		// UPDATE Methods
		promptUpdating,
		startUpdating,
		finishedUpdating,
		cancelUpdating,
		failedUpdating,
		// DELETE Props
		deleteMessage: deleteAction.message,
		deleteState: deleteAction.state,
		deleteError: deleteAction.error,
		deletingFailed,
		deleting,
		deleteWorking,
		// DELETE Methods
		promptDeleting,
		startDeleting,
		finishedDeleting,
		cancelDeleting,
		failedDeleting,
		// COMPUTED
		itemDataLoaded,
		editing,
		itemDataReady,
		editWorking,
		itemViewOpen,
		cancelEditing,
		saveWorking: createWorking || updateWorking,
		// Params
		paramsRef,
	};
};
