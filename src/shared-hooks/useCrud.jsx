import { useCallback, useState } from "react";
import { useAction } from "./useAction";
import { useMemo } from "react";
import ActionState from "../shared-constants/action-state";
import { useForm } from "react-hook-form";

export const useCrud = () => {
	const [itemData, setItemData] = useState();

	const createAction = useAction();
	const readAction = useAction();
	const updateAction = useAction();
	const deleteAction = useAction();

	const cancelAction = useCallback(() => {
		console.debug(`crud.cancelAction`);
		createAction.clear();
		readAction.clear();
		updateAction.clear();
		deleteAction.clear();
	}, [createAction, deleteAction, readAction, updateAction]);

	// CREATE
	const createPrompt = useCallback(
		(data, message) => {
			createAction.prompt(data, message);
			setItemData(data);
		},
		[createAction]
	);

	const createCancel = useCallback(() => {
		createAction.clear();
	}, [createAction]);

	const createStart = useCallback(
		(value) => {
			createAction.start(value);
		},
		[createAction]
	);

	const createDone = useCallback(() => {
		createAction.clear();
	}, [createAction]);

	const createFail = useCallback(
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
	const readStart = useCallback(
		(value, message) => {
			console.debug("readStart", value);
			readAction.start(value, message);
			setItemData(value);
		},
		[readAction]
	);

	const readDone = useCallback(
		(value) => {
			console.debug("readDone", value);
			setItemData(value);
			readAction.finish(value);
		},
		[readAction]
	);

	const readCancel = useCallback(() => {
		readAction.clear();
	}, [readAction]);

	const readFail = useCallback(
		(err) => {
			console.debug("readFail", err);
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

	const readFailed = useMemo(() => {
		return readAction.failed || !!readAction.error;
	}, [readAction.error, readAction.failed]);

	// const readDone = useMemo(() => {
	// 	return readAction.state === ActionState.DONE;
	// }, [readAction.state]);

	// UPDATE
	const updatePrompt = useCallback(
		(data, message) => {
			updateAction.prompt(data, message);
		},
		[updateAction]
	);

	const updateStart = useCallback(
		(value) => {
			updateAction.start(value);
		},
		[updateAction]
	);

	const updateDone = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const updateCancel = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const updateFail = useCallback(
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

	const updateFailed = useMemo(() => {
		return updateAction.failed || !!updateAction.error;
	}, [updateAction.error, updateAction.failed]);

	// DELETE
	const deletePrompt = useCallback(
		(payload, message) => {
			deleteAction.prompt(payload, message);
		},
		[deleteAction]
	);

	const deleteStart = useCallback(
		(payload) => {
			deleteAction.start(payload);
		},
		[deleteAction]
	);

	const deleteDone = useCallback(() => {
		deleteAction.finish();
	}, [deleteAction]);

	const deleteCancel = useCallback(() => {
		deleteAction.clear();
	}, [deleteAction]);

	const deleteFail = useCallback(
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

	const deleteFailed = useMemo(() => {
		return deleteAction.failed || !!deleteAction.error;
	}, [deleteAction.error, deleteAction.failed]);

	// Global synth props

	// const editing = useMemo(() => {
	// 	return creating || updating;
	// }, [creating, updating]);

	return {
		itemData,
		cancelAction,
		// C
		createState: createAction.state,
		createFailed: createFailed,
		createError: createAction.error,
		creating: creating,
		createWorking,
		// C methods
		createPrompt,
		createStart,
		createDone,
		createCancel,
		createFail,
		// R
		readState: readAction.state,
		readFailed: readFailed,
		readError: readAction.error,
		reading,
		readWorking,
		// readDone,
		// R METHODS
		readStart,
		readDone,
		readCancel,
		readFail,
		// U
		updateState: updateAction.state,
		updateFailed: updateFailed,
		updateError: updateAction.error,
		updating,
		updateWorking,
		// U METHODS
		updatePrompt,
		updateStart,
		updateDone,
		updateCancel,
		updateFail,
		// D
		deleteState: deleteAction.state,
		deleteFailed: deleteFailed,
		deleteError: deleteAction.error,
		deleting,
		deleteWorking,
		// D METHODS
		deletePrompt,
		deleteStart,
		deleteDone,
		deleteCancel,
		deleteFail,
		// COMPUTED
		editing: createAction.state != null || updateAction.state != null,
	};
};
