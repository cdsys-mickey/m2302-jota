import { useCallback } from "react";
import { useState } from "react";

export const useDialogs = ({ buttonProps }) => {
	const [entities, setEntities] = useState([]);

	const closeLatest = useCallback(() => {
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
		({ buttonProps: dialogbuttonProps, ...dialogProps }) => {
			setEntities((prev) => [
				...prev,
				{
					buttonProps: {
						...buttonProps,
						...dialogbuttonProps,
					},
					open: true,
					...dialogProps,
				},
			]);
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
		({ title = "確認", message = "[訊息]", onConfirm, onCancel }) => {
			create({
				title: title,
				message: message,
				onConfirm: () => {
					if (onConfirm) onConfirm();
					closeLatest();
				},
				onCancel: () => {
					if (onCancel) onCancel();
					closeLatest();
				},
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
			...rest
		}) => {
			create({
				title: title,
				message: message,
				prompt: true,
				defaultPromptValue: value,
				promptTextFieldProps: {
					label: "正式商品編號",
				},
				onConfirm: (v) => {
					if (onConfirm) onConfirm(v);
					closeLatest();
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
		({ title = "提醒", message = "[訊息]", onConfirm }) => {
			create({
				title: title,
				message: message,
				onConfirm: () => {
					if (onConfirm) onConfirm();
					closeLatest();
				},
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
