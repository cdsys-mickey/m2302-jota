import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useState } from "react";

export const useDialogs = ({ buttonProps: baseButtonProps }) => {
	const [entities, setEntities] = useState([]);

	const close = useCallback((opts = {}) => {
		console.log("close dialog", opts);
		const { id, dontDestory = false } = opts;

		setEntities(prev => {
			if (id) {
				const selected = prev.find(x => x.id === id);
				if (selected) {
					// if (selected.onClose) {
					// 	selected.onClose();
					// }
					if (dontDestory) {
						return prev.map(x => x.id === opts.id ? { ...x, open: false, working: false } : x);
					} else {
						return prev.filter(x => x.id !== opts.id);
					}
				} else {
					console.warn(`由於沒有找到 opts.id [${opts.id}], 清除了所有 dialogs`)
					return [];
				}
			} else {
				console.warn("由於 opts.id 為空, 清除了所有 dialogs")
				return [];
			}
		})
	}, []);

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
			buttonProps,
			closeOthers = false,
			onConfirm,
			// onCancel,
			closeOnConfirm = true,
			...dialogProps
		}) => {
			const newId = nanoid();
			const handleConfirm = (opts) => {
				const { value } = opts;
				if (onConfirm) {
					onConfirm({ id: newId, value });
				}
				if (closeOnConfirm) {
					close({ id: newId });
				}
			}

			// const handleCancel = (opts) => {
			// 	if (onCancel) {
			// 		onCancel({ id: newId });
			// 	}
			// 	close(opts);
			// }

			const handleClose = () => {
				close({ id: newId });
			}

			const newDialog = {
				id: newId,
				buttonProps: {
					...baseButtonProps,
					...buttonProps,
				},
				open: true,
				onConfirm: handleConfirm,
				// onCancel: handleCancel,
				onClose: handleClose,
				...dialogProps,
			}
			if (closeOthers) {
				setEntities([
					newDialog,
				]);
			} else {
				setEntities((prev) => [
					...prev,
					newDialog,
				]);
			}
			return newId;
		},
		[baseButtonProps, close]
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
			// message = "[訊息]",
			message,
			onConfirm,
			onCancel,
			closeOnConfirm = true,
			...rest
		}) => {
			return create({
				title: title,
				message: message,
				onConfirm: (opts) => {
					if (onConfirm) onConfirm(opts);
					if (closeOnConfirm) {
						close(opts);
					}
				},
				onCancel: (opts) => {
					if (onCancel) onCancel(opts);
					close(opts);
				},
				...rest,
			});
		},
		[close, create]
	);

	const prompt = useCallback(
		({
			title = "確認",
			// message = "[訊息]",
			message,
			value = "",
			// onConfirm,
			onCancel,
			label,
			// closeOnConfirm = true,
			...rest
		}) => {
			return create({
				title: title,
				message: message,
				prompt: true,
				defaultPromptValue: value,
				promptTextFieldProps: {
					label: label,
				},
				// onConfirm: (opts) => {
				// 	if (onConfirm) onConfirm(opts);
				// 	if (closeOnConfirm) {
				// 		close(opts);
				// 	}
				// },
				onCancel: (opts) => {
					if (onCancel) onCancel(opts);
					close(opts);
				},
				...rest,
			});
		},
		[close, create]
	);

	const alert = useCallback(
		({ title = "提醒", message = "[訊息]", onConfirm, ...rest }) => {
			return create({
				title: title,
				message: message,
				// onConfirm: (opts) => {
				// 	if (onConfirm) onConfirm(opts);
				// 	// closeLatest();
				// 	close(opts);
				// },
				...rest,
			});
		},
		[create]
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
		close
	};
};
