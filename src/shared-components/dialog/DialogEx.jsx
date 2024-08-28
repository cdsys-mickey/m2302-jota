import {
	Box,
	Button,
	Dialog,
	DialogActions,
	// Checkbox,
	DialogContent,
	DialogContentText,
	TextField,
	Tooltip,
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
import DialogTitleEx from "./DialogTitleEx";
import { ButtonWrapper } from "../button/ButtonWrapper";

const defaultActionsStyle = {};

const defaultConfirmButtonProps = {
	type: "submit",
	variant: "contained",
	color: "primary",
};

const defaultCancelButtonProps = {
	variant: "outlined",
	color: "primary",
};

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
			actionsStyle = defaultActionsStyle,
			message,
			placeholder,
			children,
			confirmText = "確定",
			cancelText = "取消",
			index = 0,
			minWidth = "20em",
			// maxWidth = "100vw",
			// minHeight,
			contentProps,
			buttonProps,
			confirmButtonProps = defaultConfirmButtonProps,
			cancelButtonProps = defaultCancelButtonProps,
			loading = false,
			working = false,
			titleButtons,
			TitleButtonsComponent,
			titleProps,
			otherActionButtons,
			OtherActionButtonsComponent,
			triggerCancelOnClose = false,
			responsive = false,
			fullScreen,
			hideCloseButton,
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
			confirmTooltip = "",
			cancelTooltip = "",
			...rest
		} = props;

		const inputRef = useRef();
		const setInputRef = useCallback((node) => {
			if (node) {
				inputRef.current = node;
			}
		}, []);

		const showTitle = useMemo(() => {
			return title || titleButtons || TitleButtonsComponent;
		}, [title, titleButtons, TitleButtonsComponent]);

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

		// const showMessage = useMemo(() => {
		// 	return !!message && !prompt;
		// }, [message, prompt]);

		const handleConfirm = useCallback(() => {
			if (onSubmit) {
				onSubmit();
				return;
			}
			if (onConfirm) {
				onConfirm(inputRef.current?.value);
			}
		}, [onConfirm, onSubmit]);

		const handleCancel = useCallback(() => {
			if (onCancel) {
				onCancel();
			}
			onClose();
		}, [onCancel, onClose]);

		const handleClose = useCallback(() => {
			if (triggerCancelOnClose && onCancel) {
				onCancel();
			}
			onClose();
		}, [triggerCancelOnClose, onCancel, onClose]);

		const handleKeyDown = useCallback(
			(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					handleConfirm();
				}
			},
			[handleConfirm]
		);

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
				onClose={handleClose}
				fullScreen={isFullScreen}
				sx={[
					{
						"& .MuiDialog-paper": {
							zIndex: 1300 + index,
						},
					},
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				<DialogTitleEx
					onClose={onClose}
					hideCloseButton={hideCloseButton}
					onReturn={onReturn}
					buttons={titleButtons}
					ButtonsComponent={TitleButtonsComponent}
					{...titleProps}
					sx={[
						(theme) => ({
							fontWeight: 600,
							...(!showTitle && {
								minHeight: theme.spacing(3),
							}),
							"& button, & label, & .button": {
								marginLeft: theme.spacing(0.2),
							},
						}),
						...(Array.isArray(titleSx) ? titleSx : [titleSx]),
					]}>
					{title}
				</DialogTitleEx>

				<DialogContent
					sx={[
						(theme) => ({
							...(minWidth && { minWidth: minWidth }),
							...(dense && {
								// paddingBottom: theme.spacing(1),
								paddingBottom: 0,
							}),
							paddingTop: 0,
						}),

						...(Array.isArray(contentSx) ? contentSx : [contentSx]),
					]}
					{...contentProps}>
					{message?.split("\n").map((line, index) => (
						<DialogContentText key={`line-${index}`}>
							{line}
						</DialogContentText>
					))}
					{prompt && (
						<Box py={1}>
							<TextField
								inputRef={setInputRef}
								placeholder={placeholder}
								size="small"
								autoFocus
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
								defaultValue={defaultPromptValue}
								onKeyDown={handleKeyDown}
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
							...(Array.isArray(actionsStyle)
								? actionsStyle
								: [actionsStyle]),
						]}>
						{otherActionButtons}
						{OtherActionButtonsComponent && (
							<OtherActionButtonsComponent />
						)}
						{showConfirmButton && (
							<Tooltip title={confirmTooltip}>
								<ButtonWrapper
									responsive
									onClick={handleConfirm}
									loading={working}
									{...(!prompt && {
										autoFocus: true,
									})}
									// autoFocus
									{...buttonProps}
									{...confirmButtonProps}>
									{confirmText}
								</ButtonWrapper>
							</Tooltip>
						)}
						{onCancel && (
							<Tooltip title={cancelTooltip}>
								<ButtonWrapper
									responsive
									color="primary"
									// onClick={onCancel}
									onClick={handleCancel}
									{...buttonProps}
									{...cancelButtonProps}>
									{cancelText}
								</ButtonWrapper>
							</Tooltip>
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
	placeholder: PropTypes.string,
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
	actionsStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	// prompt
	prompt: PropTypes.bool,
	defaultPromptValue: PropTypes.string,
	promptTextFieldProps: PropTypes.object,
	onSubmit: PropTypes.func,
	dense: PropTypes.bool,
	hideCloseButton: PropTypes.bool,
	triggerCancelOnClose: PropTypes.bool,
	confirmTooltip: PropTypes.string,
	cancelTooltip: PropTypes.string,
};

export default DialogEx;
