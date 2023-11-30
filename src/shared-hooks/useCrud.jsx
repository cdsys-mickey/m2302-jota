import { useCallback, useState } from "react";
import { useAction } from "./useAction";
import { useMemo } from "react";
import ActionState from "../shared-constants/action-state";

export const useCrud = ({ useItemView = false } = {}) => {
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
	const promptCreate = useCallback(
		(data, message) => {
			createAction.prompt(data, message);
			setItemData(data);
		},
		[createAction]
	);

	const cancelCreate = useCallback(() => {
		createAction.clear();
	}, [createAction]);

	const startCreate = useCallback(
		(value) => {
			createAction.start(value);
		},
		[createAction]
	);

	const finishCreate = useCallback(() => {
		createAction.clear();
	}, [createAction]);

	const failCreate = useCallback(
		(err) => {
			createAction.fail(err);
		},
		[createAction]
	);

	const creating = useMemo(() => {
		return !!createAction.state && createAction !== ActionState.DONE;
	}, [createAction]);

	const createWorking = useMemo(() => {
		return createAction.state === ActionState.WORKING;
	}, [createAction.state]);

	// READ
	const startRead = useCallback(
		(value, message) => {
			console.debug("startRead", value);
			readAction.start(value, message);
			setItemData(value);
		},
		[readAction]
	);

	const finishRead = useCallback(
		(value) => {
			console.debug("finishRead", value);
			readAction.finish(value);
			setItemData(value);
		},
		[readAction]
	);

	const cancelRead = useCallback(() => {
		readAction.clear();
	}, [readAction]);

	const failRead = useCallback(
		(err) => {
			console.debug("failRead", err);
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

	// UPDATE
	const promptUpdate = useCallback(
		(data, message) => {
			updateAction.prompt(data, message);
		},
		[updateAction]
	);

	const startUpdate = useCallback(
		(value) => {
			updateAction.start(value);
		},
		[updateAction]
	);

	const finishUpdate = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const cancelUpdate = useCallback(() => {
		updateAction.clear();
	}, [updateAction]);

	const failUpdate = useCallback(
		(err) => {
			updateAction.fail(err);
		},
		[updateAction]
	);

	const updating = useMemo(() => {
		return !!updateAction.state && updateAction !== ActionState.DONE;
	}, [updateAction]);

	const updateWorking = useMemo(() => {
		return updateAction.state === ActionState.WORKING;
	}, [updateAction.state]);

	// DELETE
	const promptDelete = useCallback(
		(payload, message) => {
			deleteAction.prompt(payload, message);
		},
		[deleteAction]
	);

	const startDelete = useCallback(
		(payload) => {
			deleteAction.start(payload);
		},
		[deleteAction]
	);

	const finishDelete = useCallback(() => {
		deleteAction.finish();
	}, [deleteAction]);

	const cancelDelete = useCallback(() => {
		deleteAction.clear();
	}, [deleteAction]);

	const failDelete = useCallback(
		(err) => {
			deleteAction.fail(err);
		},
		[deleteAction]
	);

	const deleting = useMemo(() => {
		return !!deleteAction.state;
	}, [deleteAction.state]);

	const deleteWorking = useMemo(() => {
		return deleteAction.state === ActionState.WORKING;
	}, [deleteAction.state]);

	const editing = useMemo(() => {
		return creating || updating;
	}, [creating, updating]);

	return {
		itemData,
		cancelAction,
		// C
		createState: createAction.state,
		createFailed: createAction.failed,
		createError: createAction.error,
		promptCreate,
		startCreate,
		finishCreate,
		cancelCreate,
		failCreate,
		creating,
		createWorking,
		// R
		readState: readAction.state,
		readFailed: readAction.failed,
		readError: readAction.error,
		startRead,
		finishRead,
		cancelRead,
		failRead,
		reading,
		readWorking,
		// U
		updateState: updateAction.state,
		updateFailed: updateAction.failed,
		updateError: updateAction.error,
		promptUpdate,
		startUpdate,
		finishUpdate,
		cancelUpdate,
		failUpdate,
		updating,
		updateWorking,
		// D
		deleteState: deleteAction.state,
		deleteFailed: deleteAction.failed,
		deleteError: deleteAction.error,
		promptDelete,
		startDelete,
		finishDelete,
		cancelDelete,
		failDelete,
		deleting,
		deleteWorking,
		// COMPUTED
		editing,
	};
};
