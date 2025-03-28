import { Box } from "@mui/material";
import { useCallback } from "react";
import { useContext } from "react";
import { DialogsContext } from "../../shared-contexts/dialog/DialogsContext";
import { toast } from "react-toastify";
import { useRef } from "react";
import ButtonWrapper from "@/shared-components/ButtonWrapper";

const DialogsTest = (props) => {
	const { ...rest } = props;
	const dialogs = useContext(DialogsContext);
	const counterRef = useRef(0);

	const openDialog = useCallback(() => {
		counterRef.current++;
		const message = `counter: ${counterRef.current}`;
		console.log(`${message} opended`);
		dialogs.confirm({
			message: `TEST[${message}]`,
			onConfirm: () => {
				toast.info(`${message} confirmed`);
				openDialog();
			},
			onCancel: () => {
				toast.warn(`${message} cancelled`);
			},
			closeOnConfirm: false,
		});
	}, [dialogs]);

	const handleClick = useCallback(() => {
		openDialog();
	}, [openDialog]);

	return (
		<Box p={6}>
			<ButtonWrapper onClick={handleClick} variant="contained">
				打開對話框
			</ButtonWrapper>
		</Box>
	);
};

DialogsTest.propTypes = {};

DialogsTest.displayName = "DialogsTest";
export default DialogsTest;
