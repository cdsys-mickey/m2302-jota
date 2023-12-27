import { useCallback, useState } from "react";
import DialogEx from "@/shared-components/dialog/DialogEx";
import { DialogsContext } from "./DialogsContext";
import PropTypes from "prop-types";
import { useDialogs } from "../../shared-hooks/dialog/useDialogs";

export const DialogsProvider = ({ children, ButtonProps }) => {
	const dialogs = useDialogs({ ButtonProps });
	const { entities, closeLatest, setEntities } = dialogs;

	return (
		<DialogsContext.Provider
			value={{
				...dialogs,
			}}>
			{children}
			{entities.map((d, i) => {
				const { onClose, destroyOnClose = true, ...dialogProps } = d;

				const handleClose = () => {
					closeLatest();
					if (destroyOnClose) {
						setEntities((prev) =>
							prev.slice(0, entities.length - 1)
						);
						console.log("dialog destroyed");
					} else {
						console.log("dialog not destroyed");
					}
				};

				return (
					<DialogEx
						key={i}
						onClose={onClose || handleClose}
						onCancel={handleClose}
						// onDestroy={handleDestroy}
						{...dialogProps}
					/>
				);
			})}
		</DialogsContext.Provider>
	);
};

DialogsProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.elementType, PropTypes.array]),
	ButtonProps: PropTypes.object,
};
