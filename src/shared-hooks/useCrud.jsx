import { useCallback, useMemo, useState } from "react";
import ActionState from "../shared-constants/action-state";
import { useAction } from "./useAction";
import { useRef } from "react";
import { useInit } from "./useInit";
import { useEffect } from "react";

export const useCrud = ({ resetOnInit = true } = {}) => {
	const paramsRef = useRef({});
	const [itemData, setItemData] = useState();

	const createAction = useAction();
	const readAction = useAction();
	const updateAction = useAction();
	const deleteAction = useAction();

	const cancelAction = useCallback(() => {
		console.log(`crud.cancelAction`);
		createAction.clear();
		readAction.clear();
		updateAction.clear();
		deleteAction.clear();
	}, [createAction, deleteAction, readAction, updateAction]);

	// CREATE
	const promptCreating = useCallback(
		(data, message) => {
			createAction.prompt(data, message);
			setItemData(data);
		},
		[createAction]
	);

	const cancelCreating = useCallback(() => {
		createAction.clear();
	}, [createAction]);

	const startCreating = useCallback(
		(value) => {
			createAction.start(value);
		},
		[createAction]
	);

	const doneCreating = useCallback(() => {
		createAction.clear();
	}, [createAction]);

	const failCreating = useCallback(
		(err) => {
			createAction.fail(err);
		},
		[createAction]
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
		(value, message) => {
			console.log("startReading", value);
			readAction.start(value, message);
			setItemData(value);
		},
		[readAction]
	);

	const doneReading = useCallback(
		(value) => {
			console.log("doneReading", value);
			setItemData(value);
			readAction.finish(value);
		},
		[readAction]
	);

	const cancelReading = useCallback(() => {
		readAction.clear();
	}, [readAction]);

	const failReading = useCallback(
		(err) => {
			console.log("failReading", err);
			readAction.fail(err);
		},
		[readAction]
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

	// const doneReading = useMemo(() => {
	// 	return readAction.state === ActionState.DONE;
	// }, [readAction.state]);

	// UPDATE
	const promptUpdating = useCallback(
		(data, message) => {
			updateAction.prompt(data, message);
		},
		[updateAction]
	);

	const startUpdating = useCallback(
		(value) => {
			updateAction.start(value);
		},
		[updateAction]
	);

	const doneUpdating = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const cancelUpdating = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const failUpdating = useCallback(
		(err) => {
			updateAction.fail(err);
		},
		[updateAction]
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
		(payload, message) => {
			deleteAction.prompt(payload, message);
		},
		[deleteAction]
	);

	const startDeleting = useCallback(
		(payload) => {
			deleteAction.start(payload);
		},
		[deleteAction]
	);

	const doneDeleting = useCallback(() => {
		deleteAction.finish();
	}, [deleteAction]);

	const cancelDeleting = useCallback(() => {
		deleteAction.clear();
	}, [deleteAction]);

	const failDeleting = useCallback(
		(err) => {
			deleteAction.fail(err);
		},
		[deleteAction]
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

	// Synthetic Props
	const itemDataReady = useMemo(() => {
		return (
			(readAction.state === ActionState.DONE && !!itemData) ||
			(!!createAction.state && !!itemData)
		);
	}, [createAction.state, itemData, readAction.state]);

	const editing = useMemo(() => {
		return !!createAction.state || !!updateAction.state;
	}, [createAction.state, updateAction.state]);

	const itemDataLoaded = useMemo(() => {
		return (
			(reading && !readWorking && !readingFailed) ||
			creating ||
			(updating && !readWorking && !readingFailed)
		);
	}, [creating, readWorking, reading, readingFailed, updating]);

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
		itemData,
		cancelAction,
		// Create Props
		createState: createAction.state,
		createFailed,
		createError: createAction.error,
		creating,
		createWorking,
		// CREATE Methods
		promptCreating,
		startCreating,
		doneCreating,
		cancelCreating,
		failCreating,
		// READ Props
		readState: readAction.state,
		readingFailed,
		readError: readAction.error,
		reading,
		readWorking,
		// READ Methods
		startReading,
		doneReading,
		cancelReading,
		failReading,
		// UPDATE Props
		updateState: updateAction.state,
		updatingFailed,
		updateError: updateAction.error,
		updating,
		updateWorking,
		// UPDATE Methods
		promptUpdating,
		startUpdating,
		doneUpdating,
		cancelUpdating,
		failUpdating,
		// DELETE Props
		deleteState: deleteAction.state,
		deletingFailed,
		deleteError: deleteAction.error,
		deleting,
		deleteWorking,
		// DELETE Methods
		promptDeleting,
		startDeleting,
		doneDeleting,
		cancelDeleting,
		failDeleting,
		// COMPUTED
		itemDataReady,
		editing,
		itemDataLoaded,
		editWorking,
		itemViewOpen,
		cancelEditing,
		// Params
		paramsRef,
	};
};
