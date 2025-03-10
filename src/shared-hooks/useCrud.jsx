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
		itemInitialized: false
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
		if (opts) {
			setState((prev) => ({
				...prev,
				...(opts.id && {
					itemId: opts.id,
				}),
				...(opts.data && {
					itemData: opts.data,
				}),
				itemInitialized: false
			}));
		}
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

	const doneCreating = useCallback(
		(opts) => {
			createAction.clear();
			setOpts(opts);
		},
		[createAction, setOpts]
	);

	const failCreating = useCallback(
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
			readAction.start({ message });
			setOpts(opts);
		},
		[readAction, setOpts]
	);

	const doneReading = useCallback(
		(opts) => {
			console.log("doneReading", opts);
			readAction.finish();
			setOpts(opts);
		},
		[readAction, setOpts]
	);

	const cancelReading = useCallback(() => {
		readAction.clear();
	}, [readAction]);

	const failReading = useCallback(
		(err, opts) => {
			console.log("failReading", err);
			readAction.fail({ error: err });
			setOpts(opts);
		},
		[readAction, setOpts]
	);

	const reading = useMemo(() => {
		return !!readAction.state;
	}, [readAction.state]);

	const readWorking = useMemo(() => {
		return readAction.state === ActionState.WORKING;
	}, [readAction.state]);

	const readingFailed = useMemo(() => {
		return readAction.failed || !!readAction.error;
	}, [readAction.error, readAction.failed]);

	// LOAD
	const startLoading = useCallback(
		(message, opts) => {
			console.log(`startLoading[${message}]`, opts);
			loadAction.start({ message });
			setOpts(opts);
		},
		[loadAction, setOpts]
	);

	const doneLoading = useCallback(
		(opts) => {
			console.log("doneLoading", opts);
			loadAction.finish();
			setOpts(opts);
		},
		[loadAction, setOpts]
	);

	const cancelLoading = useCallback(() => {
		loadAction.clear();
	}, [loadAction]);

	const failLoading = useCallback(
		(err, opts) => {
			console.log("failLoading", err);
			loadAction.fail({ error: err });
			setOpts(opts);
		},
		[loadAction, setOpts]
	);

	const loading = useMemo(() => {
		return !!loadAction.state;
	}, [loadAction.state]);

	const loadWorking = useMemo(() => {
		return loadAction.state === ActionState.WORKING;
	}, [loadAction.state]);

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

	const doneUpdating = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const cancelUpdating = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const failUpdating = useCallback(
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

	const doneDeleting = useCallback(() => {
		deleteAction.finish();
	}, [deleteAction]);

	const cancelDeleting = useCallback(() => {
		deleteAction.clear();
	}, [deleteAction]);

	const failDeleting = useCallback(
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

	// 資料已讀取完成
	const itemDataLoaded = useMemo(() => {
		return (
			(readAction.state === ActionState.DONE || loadAction.state === ActionState.DONE && !!state.itemData) ||
			(!!createAction.state && !!state.itemData)
		);
	}, [createAction.state, loadAction.state, readAction.state, state.itemData]);

	// 資料已就緒 → 配合新增等狀況
	const itemDataReady = useMemo(() => {
		// return (
		// 	(loading && !loadWorking && !loadingFailed) ||
		// 	((reading || creating || updating) && !readWorking && !readingFailed)
		// );
		return (
			(loading && !loadWorking && !loadingFailed) ||
			(reading && !readWorking && !readingFailed) ||
			(creating && !readWorking && !readingFailed) ||
			(updating && !readWorking && !readingFailed)
		);
	}, [creating, loadWorking, loading, loadingFailed, readWorking, reading, readingFailed, updating]);

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
		doneCreating,
		cancelCreating,
		failCreating,
		// READ Props
		readMessage: readAction.message,
		readState: readAction.state,
		readError: readAction.error,
		readingFailed,
		reading,
		readWorking,
		// READ Methods
		startReading,
		doneReading,
		cancelReading,
		failReading,
		// LOAD Props
		loadMessage: loadAction.message,
		loadState: loadAction.state,
		loadError: loadAction.error,
		loadingFailed,
		loading,
		loadWorking,
		// LOAD Methods
		startLoading,
		doneLoading,
		cancelLoading,
		failLoading,
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
		doneUpdating,
		cancelUpdating,
		failUpdating,
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
		doneDeleting,
		cancelDeleting,
		failDeleting,
		// COMPUTED
		itemDataLoaded,
		editing,
		itemDataReady,
		editWorking,
		itemViewOpen,
		cancelEditing,
		// Params
		paramsRef,
	};
};
