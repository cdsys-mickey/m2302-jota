import { useCallback, useState } from "react";
import ActionState from "../shared-constants/action-state";
import { useMemo } from "react";
import { useRef } from "react";

export const useAction = (initState = null) => {
	const [actionState, setActionState] = useState({
		state: initState,
		// payload: null,
		message: null,
		error: null,
		params: null
	});

	// const [error, setError] = useState();
	// const [errorState, setErrorState] = useState({
	// 	error: null,
	// 	failed: false,
	// });
	// const [payload, setPayload] = useState();
	// const [message, setMessage] = useState();

	const prompt = useCallback(({ message, params } = {}) => {
		console.log(`prompt`, message);

		setActionState((prev) => ({
			...prev,
			state: ActionState.PROMPT,
			message,
			params
		}));
	}, []);
	// const prompt = useCallback((data, message) => {
	// 	console.log("prompt", data);

	// 	setActionState((prev) => ({
	// 		...prev,
	// 		state: ActionState.PROMPT,
	// 		payload: data,
	// 		message: message,
	// 	}));
	// }, []);

	const start = useCallback(({ message, params } = {}) => {
		setActionState((prev) => ({
			...prev,
			state: ActionState.WORKING,
			error: null,
			// payload: null,
			message,
			params
		}));
	}, []);

	const finish = useCallback(({ message, params } = {}) => {
		// setActionState(ActionState.DONE);
		// setPayload(payload);
		setActionState((prev) => ({
			...prev,
			state: ActionState.DONE,
			// payload: payload,
			message,
			params
		}));
	}, []);

	const fail = useCallback(({ error, message } = {}) => {
		setActionState((prev) => ({
			...prev,
			state: ActionState.FAILED,
			message,
			error,
		}));
	}, []);

	const clear = useCallback(() => {
		setActionState({
			state: null,
			// payload: null,
			message: null,
			error: null,
			params: null
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

	const failed = useMemo(() => {
		return actionState.state === ActionState.FAILED;
	}, [actionState.state]);

	const active = useMemo(() => !!actionState.state, [actionState.state]);

	return {
		...actionState,
		// METHODS
		prompt,
		start,
		finish,
		fail,
		// clear,
		clear,
		// 合成狀態
		active,
		working,
		prompting,
		done,
		failed,
	};
};
