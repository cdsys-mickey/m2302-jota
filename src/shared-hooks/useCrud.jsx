import { useCallback, useMemo, useState } from "react";
import ActionState from "../shared-constants/action-state";
import { useAction } from "./useAction";
import { useRef } from "react";

export const useCrud = () => {
	const paramsRef = useRef({});
	// const [itemData, setItemData] = useState();
	const [state, setState] = useState({
		itemId: null,
		itemData: null,
	});

	const createAction = useAction();
	const readAction = useAction();
	const updateAction = useAction();
	const deleteAction = useAction();

	const setItemData = useCallback((data) => {
		setState((prev) => ({
			...prev,
			itemData: data,
		}));
	}, []);

	const cancelAction = useCallback(() => {
		console.log(`crud.cancelAction`);
		createAction.clear();
		readAction.clear();
		updateAction.clear();
		deleteAction.clear();
	}, [createAction, deleteAction, readAction, updateAction]);

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
			createAction.start(message);
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
			createAction.fail(err);
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
			console.log(`startReading${message}`, opts);
			readAction.start(message);
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
			readAction.fail(err);
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

	// UPDATE
	// 打開編輯器
	const promptUpdating = useCallback(
		(message, opts) => {
			updateAction.prompt(message);
			setOpts(opts);
		},
		[setOpts, updateAction]
	);

	const startUpdating = useCallback(
		(message, opts) => {
			updateAction.start(message);
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
			updateAction.fail(err);
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
			deleteAction.prompt(message);
			setOpts(opts);
		},
		[deleteAction, setOpts]
	);

	const startDeleting = useCallback(
		(message, opts) => {
			deleteAction.start(message);
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
			deleteAction.fail(err);
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
			(readAction.state === ActionState.DONE && !!state.itemData) ||
			(!!createAction.state && !!state.itemData)
		);
	}, [createAction.state, readAction.state, state.itemData]);

	// 資料已就緒 → 配合新增等狀況
	const itemDataReady = useMemo(() => {
		return (
			(reading && !readWorking && !readingFailed) ||
			creating ||
			(updating && !readWorking && !readingFailed)
		);
	}, [creating, readWorking, reading, readingFailed, updating]);

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
