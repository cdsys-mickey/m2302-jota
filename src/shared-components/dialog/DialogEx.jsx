import {
	Box,
	Dialog,
	DialogActions,
	// Checkbox,
	DialogContent,
	DialogContentText,
	TextField,
	Tooltip
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
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import MuiStyles from "@/shared-modules/MuiStyles";
import DialogTitleEx from "./DialogTitleEx";
import CheckboxEx from "../checkbox/CheckboxExView";
import { ButtonEx } from "@/shared-components";


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
			slotProps,
			dense = false,
			sx = [],
			title,
			titleSx = [],
			contentSx = [],
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
			cancelDisabled,
			confirmDisabled = false,
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
			// CHECK
			check = false,
			defaultChecked = false,
			checkedValue = "ON",
			checkLabel,
			onSubmit,
			confirmTooltip = "",
			cancelTooltip = "",
			id,
			mask = false,
			confirmButton,
			...rest
		} = props;
		// const dialogs = useContext(DialogsContext);

		const _cancelDisabled = useMemo(() => {
			return cancelDisabled != null ? cancelDisabled : working;
		}, [cancelDisabled, working])



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
			return !!onConfirm || !!onSubmit || !!confirmButton;
		}, [confirmButton, onConfirm, onSubmit]);

		const _fullScreen = useMemo(() => {
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
			if (onConfirm) {
				onConfirm({
					...(inputRef.current?.value != null && {
						value: inputRef.current?.value,
					}),
					...(inputRef.current?.checked != null && {
						checked: inputRef.current?.checked,
					}),
					id
				});
			}
			if (onSubmit) {
				onSubmit();
				return;
			}
		}, [id, onConfirm, onSubmit]);

		const handleCancel = useCallback(() => {
			if (onCancel) {
				onCancel();
			}
			if (onClose) {
				onClose({
					id
				});
			}
		}, [id, onCancel, onClose]);

		const handleClose = useCallback(() => {
			if (triggerCancelOnClose && onCancel) {
				onCancel();
			}
			if (onClose) {
				onClose({
					id
				});
			}
		}, [triggerCancelOnClose, onCancel, onClose, id]);

		const handleKeyDown = useCallback(
			(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					handleConfirm();
				}
			},
			[handleConfirm]
		);

		// const handleToggle = useCallback((e) => {

		// }, []);

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
				fullScreen={_fullScreen}
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
							// "& button, & label, & .button": {
							// 	marginLeft: theme.spacing(0.2),
							// },
							// display: 'flex', // Ensure the parent is a flex container for gap to work
							// gap: theme.spacing(0.6), // Use gap instead of marginLeft
						}),
						...(Array.isArray(titleSx) ? titleSx : [titleSx]),
					]}>
					{title}
				</DialogTitleEx>

				<DialogContent
					sx={[
						() => ({
							...(minWidth && { minWidth: minWidth }),
							...(dense && {
								paddingBottom: 1,
							}),
							paddingTop: 0,
						}),

						...(Array.isArray(contentSx) ? contentSx : [contentSx]),
					]}
					{...slotProps?.content}
					{...contentProps}
				>
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
								{...(mask && {
									type: "password"
								})}
								size="small"
								autoFocus
								fullWidth
								InputLabelProps={
									MuiStyles.DEFAULT_INPUT_LABEL_PROPS
								}
								defaultValue={defaultPromptValue}
								onKeyDown={handleKeyDown}
								inputProps={{
									autocomplete: "off"
								}}
								{...promptTextFieldProps}
							/>
						</Box>
					)}
					{check && (
						<Box py={1}>
							<CheckboxEx
								inputRef={setInputRef}
								autoFocus
								label={checkLabel}
								defaultChecked={defaultChecked}
								value={checkedValue}
							/>

						</Box>
					)}
					{/* <form onSubmit={onSubmit}>{children}</form> */}
					{children}
				</DialogContent>
				{showActions && (
					<DialogActions
						{...slotProps?.actions}>
						{otherActionButtons}
						{OtherActionButtonsComponent && (
							<OtherActionButtonsComponent />
						)}
						{showConfirmButton && confirmButton ? (
							<Tooltip title={confirmTooltip}>
								{confirmButton}
							</Tooltip>
						) : (
							<Tooltip title={confirmTooltip}>
								<ButtonEx
									responsive
									onClick={handleConfirm}
									loading={working}
									{...(!prompt && {
										autoFocus: true,
									})}
									disabled={confirmDisabled}
									{...buttonProps}
									{...confirmButtonProps}>
									{confirmText}
								</ButtonEx>
							</Tooltip>
						)}
						{onCancel && (
							<Tooltip title={cancelTooltip}>
								<ButtonEx
									responsive
									color="primary"
									// onClick={onCancel}
									onClick={handleCancel}
									disabled={_cancelDisabled}
									{...buttonProps}
									{...cancelButtonProps}>
									{cancelText}
								</ButtonEx>
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
	mask: PropTypes.bool,
	defaultPromptValue: PropTypes.string,
	promptTextFieldProps: PropTypes.object,
	onSubmit: PropTypes.func,
	dense: PropTypes.bool,
	hideCloseButton: PropTypes.bool,
	triggerCancelOnClose: PropTypes.bool,
	confirmTooltip: PropTypes.string,
	cancelTooltip: PropTypes.string,
	close: PropTypes.func,
	id: PropTypes.string,
	confirmDisabled: PropTypes.bool,
	cancelDisabled: PropTypes.bool,
	slotProps: PropTypes.object,
	// check
	check: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	checkLabel: PropTypes.string,
	checkedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default DialogEx;
