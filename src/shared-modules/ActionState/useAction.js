import { useCallback, useState } from "react";
import { useMemo } from "react";
import ActionState from "./ActionState";

export default function useAction(initState = null) {
	const [actionState, setActionState] = useState({
		state: initState,
		message: null,
		error: null,
	});

	const prompt = useCallback(({ message, params } = {}) => {
		console.log(`prompt`, message);

		setActionState((prev) => ({
			...prev,
			state: ActionState.PROMPT,
			message,
			...params
		}));
	}, []);


	const start = useCallback(({ message, params } = {}) => {
		setActionState((prev) => ({
			...prev,
			state: ActionState.WORKING,
			error: null,
			// payload: null,
			message,
			...params
		}));
	}, []);

	const finish = useCallback(({ message, params } = {}) => {
		// setActionState(ActionState.DONE);
		// setPayload(payload);
		setActionState((prev) => ({
			...prev,
			state: ActionState.DONE,
			message,
			...params
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
			params: null,
			supressLoading: false
		});
	}, []);

	const working = useMemo(() => {
		return actionState.state === ActionState.WORKING;
	}, [actionState.state]);

	const prompting = useMemo(() => {
		return actionState.state === ActionState.PROMPT;
	}, [actionState.state]);

	const finished = useMemo(() => {
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
		finished,
		failed,
	};
};
