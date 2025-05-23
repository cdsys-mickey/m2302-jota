import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useState } from "react";

export const useDialogs = ({ buttonProps: baseButtonProps, sizeLimit = 5 }) => {
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
					console.warn(`由於沒有找到 opts.id [${opts.id}], 忽略關閉視窗動作`)
					return prev;
					// return [];
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
			id,
			buttonProps,
			closeOthers = false,
			onConfirm,
			// onCancel,
			closeOnConfirm = true,
			...dialogProps
		}) => {
			if (entities.length > sizeLimit) {
				throw new Error(`視窗數已超過最大限制 ${sizeLimit}`);
			}

			const newId = id || nanoid();
			const handleConfirm = (params) => {
				if (onConfirm) {
					onConfirm({
						...params,
						id: newId,
					});
				}
				if (closeOnConfirm) {
					close({
						...params,
						id: newId,
					});
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
			id,
			title = "確認",
			// message = "[訊息]",
			message,
			onConfirm,
			onCancel,
			closeOnConfirm = true,
			...rest
		}) => {
			const newId = id || nanoid();
			return create({
				id: newId,
				title: title,
				message: message,
				onConfirm: (params) => {
					if (onConfirm) onConfirm({
						...params,
						id: newId,
					});
					if (closeOnConfirm) {
						close({
							...params,
							id: newId,
						});
					}
				},
				onCancel: (params) => {
					if (onCancel) onCancel({
						...params,
						id: newId,
					});
					close({
						...params,
						id: newId,
					});
				},
				...rest,
			});
		},
		[close, create]
	);

	const prompt = useCallback(
		({
			id,
			title = "確認",
			// message = "[訊息]",
			message,
			value = "",
			// onConfirm,
			onCancel,
			label,
			mask = false,
			...rest
		}) => {
			const newId = id || nanoid();
			return create({
				id: newId,
				title: title,
				message: message,
				prompt: true,
				mask,
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
				onCancel: (params) => {
					if (onCancel) onCancel({
						...params,
						id: newId,
					});
					close({
						...params,
						id: newId,
					});
				},
				...rest,
			});
		},
		[close, create]
	);

	const alert = useCallback(
		({ title = "提醒", message = "[訊息]", ...rest }) => {
			const newId = nanoid();
			return create({
				id: newId,
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
