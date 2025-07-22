import { useDialogs } from "@/shared-hooks/dialog/useDialogs";
import PropTypes from "prop-types";
import { DialogsContext } from "./DialogsContext";
import { DialogEx } from "@/shared-components";

export const DialogsProvider = ({ children, buttonProps }) => {
	const dialogs = useDialogs({ buttonProps });
	const { entities, closeLatest, setEntities } = dialogs;

	return (
		<DialogsContext.Provider
			value={{
				...dialogs,
			}}>
			{children}
			{entities.map((d, i) => {
				const {
					id,
					// onClose,
					// onCancel,

					...dialogProps
				} = d;

				// const houseKeeping = () => {
				// 	if (destroyOnClose) {
				// 		setEntities((prev) =>
				// 			prev.slice(0, entities.length - 1)
				// 		);
				// 		console.log(`dialog[${i}] destroyed`);
				// 	} else {
				// 		console.log(`dialog[${i}] closed but not destroyed`);
				// 	}
				// };

				// const houseKeeping = () => {
				// 	setEntities((prev) =>
				// 		prev.filter(x => x.open)
				// 	);
				// };

				// const handleClose = () => {
				// 	if (onClose) {
				// 		onClose();
				// 	}
				// 	// houseKeeping();
				// };

				// const handleCancel = () => {
				// 	if (onCancel) {
				// 		onCancel();
				// 	}
				// 	// houseKeeping();
				// };

				return (
					<DialogEx
						key={id || i}
						index={i}
						// onClose={handleClose}
						// onCancel={handleCancel}
						{...dialogProps}
					/>
				);
			})}
		</DialogsContext.Provider>
	);
};

DialogsProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	buttonProps: PropTypes.object,
};
