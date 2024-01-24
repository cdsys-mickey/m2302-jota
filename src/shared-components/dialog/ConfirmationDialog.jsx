import React from "react";
import { LoadingButton } from "@mui/lab";
import {
	Dialog,
	DialogTitle,
	DialogContentText,
	DialogActions,
	Button,
	// Checkbox,
	DialogContent,
} from "@mui/material";

/**
 * 關鍵屬性是 onConfirm, onCancel, 以及 onClose, 雖然沒有在這裡定義 onClose,
 * 可是他會往下傳遞給 Dialog, 有 onClose 才會
 * 1. 按 X 關閉對話框
 * 2. 按 esc 關閉對話框
 * @param {*} param0
 * @returns
 */
const ConfirmationDialog = ({
	title,
	message,
	children,
	confirmText = "確定",
	cancelText = "取消",
	onConfirm,
	onCancel,
	minWidth = "24rem",
	minHeight,
	buttonProps,
	confirmbuttonProps,
	cancelbuttonProps,
	working = false,
	...rest
}) => {
	return (
		<Dialog
			sx={(theme) => ({
				"& .MuiDialog-paper": {
					minWidth: minWidth,
					minHeight: minHeight,
				},
				"& .MuiDialogContentText-root": {
					paddingLeft: theme.spacing(3),
					paddingRight: theme.spacing(3),
				},
			})}
			{...rest}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{message && <DialogContentText>{message}</DialogContentText>}

				{children}
			</DialogContent>
			<DialogActions>
				{onConfirm && (
					<LoadingButton
						loading={working}
						variant="contained"
						color="primary"
						onClick={onConfirm}
						{...buttonProps}
						{...confirmbuttonProps}>
						{confirmText}
					</LoadingButton>
				)}

				{onCancel && (
					<Button
						variant="outlined"
						color="primary"
						onClick={onCancel}
						{...buttonProps}
						{...cancelbuttonProps}>
						{cancelText}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default React.memo(ConfirmationDialog);
// export const MemoizedConfirmationDialog = React.memo(ConfirmationDialog);
