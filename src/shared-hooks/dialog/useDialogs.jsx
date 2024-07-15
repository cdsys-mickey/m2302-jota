import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useState } from "react";

export const useDialogs = ({ buttonProps }) => {
	const [entities, setEntities] = useState([]);

	const closeLatest = useCallback(() => {
		console.log("closeLatest");
		setEntities((prev) => {
			const latest = prev.pop();
			if (!latest) {
				return prev;
			}
			if (latest.onClose) {
				latest.onClose();
			}
			return [...prev].concat({ ...latest, open: false, working: false });
		});
	}, []);

	const create = useCallback(
		({
			buttonProps: dialogbuttonProps,
			closeOthers = false,
			...dialogProps
		}) => {
			if (closeOthers) {
				setEntities([
					{
						id: nanoid(),
						buttonProps: {
							...buttonProps,
							...dialogbuttonProps,
						},
						open: true,
						...dialogProps,
					},
				]);
			} else {
				setEntities((prev) => [
					...prev,
					{
						id: nanoid(),
						buttonProps: {
							...buttonProps,
							...dialogbuttonProps,
						},
						open: true,
						...dialogProps,
					},
				]);
			}
		},
		[buttonProps]
	);

	const setWorking = useCallback((working) => {
		setEntities((prev) => {
			const latest = prev.pop();
			if (!latest) {
				return prev;
			}
			return [...prev].concat({ ...latest, working });
		});
	}, []);

	const confirm = useCallback(
		({
			title = "確認",
			message = "[訊息]",
			onConfirm,
			onCancel,
			closeOnConfirm = true,
			...rest
		}) => {
			create({
				title: title,
				message: message,
				onConfirm: () => {
					if (onConfirm) onConfirm();
					if (closeOnConfirm) {
						closeLatest();
					}
				},
				onCancel: () => {
					if (onCancel) onCancel();
					closeLatest();
				},
				...rest,
			});
		},
		[closeLatest, create]
	);

	const prompt = useCallback(
		({
			title = "確認",
			message = "[訊息]",
			value = "",
			onConfirm,
			onCancel,
			label,
			disableCloseOnConfirm = false,
			...rest
		}) => {
			create({
				title: title,
				message: message,
				prompt: true,
				defaultPromptValue: value,
				promptTextFieldProps: {
					label: label,
				},
				onConfirm: (v) => {
					if (onConfirm) onConfirm(v);
					if (!disableCloseOnConfirm) {
						closeLatest();
					}
				},
				onCancel: () => {
					if (onCancel) onCancel();
					closeLatest();
				},
				...rest,
			});
		},
		[closeLatest, create]
	);

	const alert = useCallback(
		({ title = "提醒", message = "[訊息]", onConfirm, ...rest }) => {
			create({
				title: title,
				message: message,
				onConfirm: () => {
					if (onConfirm) onConfirm();
					closeLatest();
				},
				...rest,
			});
		},
		[create, closeLatest]
	);

	return {
		entities,
		setEntities,
		create,
		confirm,
		alert,
		setWorking,
		closeLatest,
		prompt,
	};
};
