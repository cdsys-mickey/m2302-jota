import useResponsive from "@/shared-contexts/responsive/useResponsive";
import { LoadingButton } from "@mui/lab";
import {
	Button,
	Dialog,
	DialogActions,
	// Checkbox,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import DialogTitleEx from "./DialogTitleEx";

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
			titleSx = [],
			contentSx = [],
			message,
			children,
			confirmText = "確定",
			cancelText = "取消",

			// minWidth = "50vw",
			// maxWidth = "100vw",
			// minHeight,
			contentProps,
			buttonProps,
			confirmButtonProps,
			cancelButtonProps,
			loading = false,
			working = false,
			titleButtons,
			titleButtonsComponent,
			titleProps,
			otherActionButtons,
			otherActionButtonsComponent,

			responsive = false,
			fullScreen,
			// METHODS
			onConfirm,
			onCancel,
			onClose,
			onReturn,
			...rest
		} = props;

		const TitleButtonsComponent = titleButtonsComponent;
		const OtherActionButtonsComponent = otherActionButtonsComponent;

		const showTitle = useMemo(() => {
			return title || titleButtons || titleButtonsComponent || onClose;
		}, [onClose, title, titleButtons, titleButtonsComponent]);

		const doRenderOtherActionButtonsComponent = useMemo(() => {
			return OtherActionButtonsComponent && !otherActionButtons;
		}, [OtherActionButtonsComponent, otherActionButtons]);

		const { mobile } = useResponsive();

		const isFullScreen = useMemo(() => {
			return (responsive && mobile) || fullScreen;
		}, [fullScreen, mobile, responsive]);

		return (
			<Dialog
				ref={ref}
				onClose={onClose}
				fullScreen={isFullScreen}
				{...rest}>
				{showTitle && (
					<DialogTitleEx
						onClose={onClose}
						onReturn={onReturn}
						buttons={titleButtons}
						buttonsComponent={TitleButtonsComponent}
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

				<DialogContent
					sx={[
						{},
						...(Array.isArray(contentSx) ? contentSx : [contentSx]),
					]}
					{...contentProps}>
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
						{otherActionButtons}
						{doRenderOtherActionButtonsComponent && (
							<OtherActionButtonsComponent />
						)}
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
DialogEx.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	children: PropTypes.node,
	confirmText: PropTypes.string,
	cancelText: PropTypes.string,
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	onClose: PropTypes.func,
	onReturn: PropTypes.func,
	loading: PropTypes.bool,
	working: PropTypes.bool,
	contentProps: PropTypes.object,
	buttonProps: PropTypes.object,
	confirmButtonProps: PropTypes.object,
	cancelButtonProps: PropTypes.object,
	titleButtons: PropTypes.element,
	titleButtonsComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	titleProps: PropTypes.object,
	otherActionButtons: PropTypes.element,
	otherActionButtonsComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	fullScreen: PropTypes.bool,
	responsive: PropTypes.bool,
	titleSx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default DialogEx;
