import { useCallback, useState } from "react";
import ActionState from "../shared-constants/action-state";

export const useAction = (initState = null) => {
	const [state, setState] = useState({
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
		// setActionState(ActionState.PROMPT);
		// setPayload(data);
		// setMessage(message);
		setState((prev) => ({
			...prev,
			state: ActionState.PROMPT,
			payload: data,
			message: message,
		}));
	}, []);

	const start = useCallback((payload, message) => {
		setState((prev) => ({
			...prev,
			state: ActionState.WORKING,
			payload: payload,
			message: message,
		}));
	}, []);

	const finish = useCallback((payload) => {
		// setActionState(ActionState.DONE);
		// setPayload(payload);
		setState((prev) => ({
			...prev,
			state: ActionState.DONE,
			payload: payload,
			message: null,
		}));
	}, []);

	const fail = useCallback((err) => {
		console.error("action failed", err);
		setState((prev) => ({
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

	// const clear = useCallback(() => {
	// 	setState({
	// 		state: null,
	// 		payload: null,
	// 		message: null,
	// 	});
	// 	setErrorState({
	// 		error: null,
	// 		failed: false,
	// 	});
	// }, []);

	const clear = useCallback(() => {
		setState({
			state: null,
			payload: null,
			message: null,
		});
		setErrorState({
			error: null,
			failed: false,
		});
	}, []);

	return {
		// actionState,
		// payload,
		// message,
		...state,
		...errorState,
		// METHODS
		prompt,
		start,
		finish,
		fail,
		// clear,
		clear,
	};
};
