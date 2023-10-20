import { LoadingButton } from "@mui/lab";
import {
	Button,
	Dialog,
	DialogActions,
	// Checkbox,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import React, { useMemo } from "react";
import DialogTitleEx from "./DialogTitleEx";
import { memo } from "react";
import { forwardRef } from "react";

/**
 * 關鍵屬性是 onConfirm, onCancel, 以及 onClose, 雖然沒有在這裡定義 onClose,
 * 可是他會往下傳遞給 Dialog, 有 onClose 才會
 * 1. 按 X 關閉對話框
 * 2. 按 esc 關閉對話框
 * @param {*} param0
 * @returns
 */
const DialogEx = memo(
	forwardRef((props, ref) => {
		const {
			title,
			message,
			children,
			confirmText = "確定",
			cancelText = "取消",
			onConfirm,
			onCancel,
			onClose,
			onReturn,
			// minWidth = "50vw",
			// maxWidth = "100vw",
			// minHeight,
			ContentProps,
			buttonProps,
			confirmButtonProps,
			cancelButtonProps,
			loading = false,
			working = false,
			titleButtons,
			titleProps,
			otherButtons,
			titleSx = [],
			responsive = false,
			...rest
		} = props;
		const showTitle = useMemo(() => {
			return title || titleButtons || onClose;
		}, [onClose, title, titleButtons]);

		return (
			<Dialog
				ref={ref}
				sx={(theme) => ({
					"& .MuiDialog-paper": {
						// minWidth: minWidth,
						// ...(minHeight && { minHeight: minHeight }),
						// ...(maxWidth && { maxWidth: maxWidth }),
					},
					"& .MuiDialogContentText-root": {
						// paddingLeft: theme.spacing(3),
						// paddingRight: theme.spacing(3),
					},
				})}
				onClose={onClose}
				{...rest}>
				{showTitle && (
					<DialogTitleEx
						onClose={onClose}
						onReturn={onReturn}
						buttons={titleButtons}
						{...titleProps}
						sx={[
							{
								fontWeight: 600,
							},
							...(Array.isArray(titleSx) ? titleSx : [titleSx]),
						]}>
						{title}
					</DialogTitleEx>
				)}

				<DialogContent {...ContentProps}>
					{message &&
						message
							.split("\n")
							.map((line, index) => (
								<DialogContentText key={`line-${index}`}>
									{line}
								</DialogContentText>
							))}

					{children}
				</DialogContent>
				{!loading && (
					<DialogActions>
						{otherButtons}
						{onConfirm && (
							<LoadingButton
								type="submit"
								variant="contained"
								color="primary"
								onClick={onConfirm}
								loading={working}
								{...buttonProps}
								{...confirmButtonProps}>
								{confirmText}
							</LoadingButton>
						)}

						{onCancel && (
							<Button
								variant="outlined"
								color="primary"
								onClick={onCancel}
								{...buttonProps}
								{...cancelButtonProps}>
								{cancelText}
							</Button>
						)}
					</DialogActions>
				)}
			</Dialog>
		);
	})
);

DialogEx.displayName = "DialogEx";

export default DialogEx;
