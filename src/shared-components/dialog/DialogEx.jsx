import {
	Box,
	Button,
	Dialog,
	DialogActions,
	// Checkbox,
	DialogContent,
	DialogContentText,
	TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import {
	forwardRef,
	memo,
	useCallback,
	useContext,
	useMemo,
	useRef,
} from "react";
import { ResponsiveContext } from "../../shared-contexts/responsive/ResponsiveContext";
import MuiStyles from "../../shared-modules/sd-mui-styles";
import ResponsiveLoadingButton from "../responsive/ResponsiveLoadingButton";
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
	forwardRef((props = {}, ref) => {
		const {
			dense = false,
			sx = [],
			title,
			titleSx = [],
			contentSx = [],
			actionsSx = [],
			message,
			children,
			confirmText = "確定",
			cancelText = "取消",

			minWidth = "20em",
			// maxWidth = "100vw",
			// minHeight,
			contentProps,
			buttonProps,
			confirmButtonProps,
			cancelButtonProps,
			loading = false,
			working = false,
			titleButtons,
			TitleButtonsComponent,
			titleProps,
			otherActionButtons,
			OtherActionButtonsComponent,

			responsive = false,
			fullScreen,
			// METHODS
			onConfirm,
			onCancel,
			onClose,
			onReturn,
			// PROMPT
			prompt = false,
			defaultPromptValue = "",
			promptTextFieldProps,
			onSubmit,
			...rest
		} = props;

		const inputRef = useRef();
		const setInputRef = useCallback((node) => {
			if (node) {
				inputRef.current = node;
			}
		}, []);

		const showTitle = useMemo(() => {
			return title || titleButtons || TitleButtonsComponent || onClose;
		}, [onClose, title, titleButtons, TitleButtonsComponent]);

		const doRenderOtherActionButtonsComponent = useMemo(() => {
			return OtherActionButtonsComponent || otherActionButtons;
		}, [OtherActionButtonsComponent, otherActionButtons]);

		const responsiveCtx = useContext(ResponsiveContext);
		const { mobile } = responsiveCtx;

		const showConfirmButton = useMemo(() => {
			return !!onConfirm || !!onSubmit;
		}, [onConfirm, onSubmit]);

		const isFullScreen = useMemo(() => {
			if (fullScreen) {
				return true;
			}
			if (responsive && !responsiveCtx) {
				console.error(
					"使用 responsive 參數必須位在 ResponsiveContext 內"
				);
			}
			return !!responsiveCtx && responsive && mobile;
		}, [fullScreen, mobile, responsive, responsiveCtx]);

		const showMessage = useMemo(() => {
			return !!message && !prompt;
		}, [message, prompt]);

		const handleConfirm = useCallback(() => {
			if (onSubmit) {
				onSubmit();
				return;
			}
			if (onConfirm) {
				onConfirm(inputRef.current?.value);
			}
		}, [onConfirm, onSubmit]);

		const showActions = useMemo(() => {
			return (
				!loading &&
				(doRenderOtherActionButtonsComponent ||
					showConfirmButton ||
					onCancel)
			);
		}, [
			doRenderOtherActionButtonsComponent,
			loading,
			onCancel,
			showConfirmButton,
		]);

		return (
			<Dialog
				ref={ref}
				onClose={onClose}
				fullScreen={isFullScreen}
				sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
				{...rest}>
				{showTitle && (
					<DialogTitleEx
						onClose={onClose}
						onReturn={onReturn}
						buttons={titleButtons}
						ButtonsComponent={TitleButtonsComponent}
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
						(theme) => ({
							...(minWidth && { minWidth: minWidth }),
							...(dense && {
								paddingBottom: theme.spacing(1),
							}),
						}),

						...(Array.isArray(contentSx) ? contentSx : [contentSx]),
					]}
					{...contentProps}>
					{showMessage &&
						message
							.split("\n")
							.map((line, index) => (
								<DialogContentText key={`line-${index}`}>
									{line}
								</DialogContentText>
							))}
					{prompt && (
						<Box py={1}>
							<TextField
								inputRef={setInputRef}
								placeholder={message}
								size="small"
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
								defaultValue={defaultPromptValue}
								{...promptTextFieldProps}
							/>
						</Box>
					)}
					{/* <form onSubmit={onSubmit}>{children}</form> */}
					{children}
				</DialogContent>
				{showActions && (
					<DialogActions
						sx={[
							...(Array.isArray(actionsSx)
								? actionsSx
								: [actionsSx]),
						]}>
						{otherActionButtons}
						{OtherActionButtonsComponent && (
							<OtherActionButtonsComponent />
						)}
						{showConfirmButton && (
							<ResponsiveLoadingButton
								type="submit"
								variant="contained"
								color="primary"
								onClick={handleConfirm}
								loading={working}
								{...buttonProps}
								{...confirmButtonProps}>
								{confirmText}
							</ResponsiveLoadingButton>
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
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),

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
	TitleButtonsComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	titleProps: PropTypes.object,
	otherActionButtons: PropTypes.element,
	OtherActionButtonsComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	fullScreen: PropTypes.bool,
	responsive: PropTypes.bool,
	titleSx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	contentSx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	actionsSx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// prompt
	prompt: PropTypes.bool,
	defaultPromptValue: PropTypes.string,
	promptTextFieldProps: PropTypes.object,
	onSubmit: PropTypes.func,
	dense: PropTypes.bool,
};

export default DialogEx;
