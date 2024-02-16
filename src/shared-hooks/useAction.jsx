import { useCallback, useState } from "react";
import ActionState from "../shared-constants/action-state";
import { useMemo } from "react";

export const useAction = (initState = null) => {
	const [actionState, setActionState] = useState({
		state: initState,
		payload: null,
		message: null,
	});
	// const [error, setError] = useState();
	const [errorState, setErrorState] = useState({
		error: null,
		failed: false,
	});
	// const [payload, setPayload] = useState();
	// const [message, setMessage] = useState();

	const prompt = useCallback((data, message) => {
		console.log("prompt");

		setActionState((prev) => ({
			...prev,
			state: ActionState.PROMPT,
			payload: data,
			message: message,
		}));
	}, []);

	const start = useCallback((payload, message) => {
		setActionState((prev) => ({
			...prev,
			state: ActionState.WORKING,
			payload: payload,
			message: message,
		}));
	}, []);

	const finish = useCallback((payload) => {
		// setActionState(ActionState.DONE);
		// setPayload(payload);
		setActionState((prev) => ({
			...prev,
			state: ActionState.DONE,
			payload: payload,
			message: null,
		}));
	}, []);

	const fail = useCallback((err) => {
		console.error("action failed", err);
		setActionState((prev) => ({
			...prev,
			state: ActionState.FAILED,
			payload: null,
			message: null,
		}));
		setErrorState({
			failed: true,
			error: err,
		});
	}, []);

	const clear = useCallback(() => {
		setActionState({
			state: null,
			payload: null,
			message: null,
		});
		setErrorState({
			error: null,
			failed: false,
		});
	}, []);

	const working = useMemo(() => {
		return actionState.state === ActionState.WORKING;
	}, [actionState.state]);

	const prompting = useMemo(() => {
		return actionState.state === ActionState.PROMPT;
	}, [actionState.state]);

	const done = useMemo(() => {
		return actionState.state === ActionState.DONE;
	}, [actionState.state]);

	return {
		...actionState,
		...errorState,
		// METHODS
		prompt,
		start,
		finish,
		fail,
		// clear,
		clear,
		// 合成狀態
		working,
		prompting,
		done,
	};
};
