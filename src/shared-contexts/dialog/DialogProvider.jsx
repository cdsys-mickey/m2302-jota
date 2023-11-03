import React, { useCallback, useState } from "react";
import DialogEx from "../../shared-components/dialog/DialogEx";
import { DialogContext } from "./DialogContext";

export const DialogProvider = ({ children, buttonProps }) => {
	const [dialogs, setDialogs] = useState([]);

	const handleCloseLatest = useCallback(() => {
		setDialogs((prev) => {
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
		(props) => {
			const { buttonProps: dialogButtonProps, ...dialogProps } = props;
			setDialogs((prev) => [
				...prev,
				{
					buttonProps: {
						...buttonProps,
						...dialogButtonProps,
					},
					...dialogProps,
					open: true,
				},
			]);
		},
		[buttonProps]
	);

	const setWorking = useCallback((working) => {
		setDialogs((prev) => {
			const latest = prev.pop();
			if (!latest) {
				return prev;
			}
			return [...prev].concat({ ...latest, working });
		});
	}, []);

	const confirm = useCallback((props) => {}, []);

	const alert = useCallback((props) => {}, []);

	return (
		<DialogContext.Provider
			value={{
				create,
				confirm,
				alert,
				setWorking,
				closeLatest: handleCloseLatest,
			}}>
			{children}
			{dialogs.map((d, i) => {
				const { onClose, destroyOnClose = true, ...dialogProps } = d;

				// const handleDestroy = () => {
				// 	// if (onDestroy) onDestroy();
				// 	setDialogs((prev) => prev.slice(0, dialogs.length - 1));
				// };

				const handleClose = () => {
					handleCloseLatest();
					if (destroyOnClose) {
						setDialogs((prev) => prev.slice(0, dialogs.length - 1));
						console.debug("dialog destroyed");
					} else {
						console.debug("dialog not destroyed");
					}
				};

				return (
					<DialogEx
						key={i}
						onClose={handleClose}
						onCancel={handleClose}
						// onDestroy={handleDestroy}
						{...dialogProps}
					/>
				);
			})}
		</DialogContext.Provider>
	);
};
