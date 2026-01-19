/* eslint-disable no-mixed-spaces-and-tabs */
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import PropTypes from "prop-types";
import { useCallback, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import MuiStyles from "@/shared-modules/MuiStyles";
import ControllerWrapper from "../ControllerWrapper";
import ClearInputButton from "../ClearInputButton/ClearInputButton";
import TextFieldExView from "./TextFieldExView";

const ControlledTextField = ({
	name,
	multiline,
	placeholder,
	// inputRef,
	label,
	readOnly = false,
	control,
	onChange: _onChange,
	// onKeyDown,
	rules,
	labelShrink = false,
	defaultValue = "",
	// sx = [],
	InputProps,
	inputProps,
	clearable,
	// disabled,
	// disabledBackgroundColor = "rgba(0,0,0,0.05)",
	EndAdornmentComponent,
	InputLabelProps,
	// dense,
	inline,
	// required,
	slotProps,
	// borderless,
	// hideSpinButtons = false,
	...rest
}) => {
	const formMeta = useContext(FormMetaContext);
	const { isFieldDisabled, handleFocusNextField, disableEnter } = formMeta || {};
	// const { setFocus } = useFormContext() || {};
	const form = useFormContext();
	const { endAdornment, ...InputPropsWithoutEndAdornment } = InputProps || {};
	const { endAdornment: inputEndAdornment, ...inputPropsWithoutEndAdornment } = slotProps?.input || {};



	// 只要有任一條件需要顯示後綴
	const renderEndAdornment = useMemo(() => {
		return EndAdornmentComponent || clearable || endAdornment || inputEndAdornment;
	}, [EndAdornmentComponent, clearable, endAdornment, inputEndAdornment]);

	const getError = useCallback(
		async (opts = { debug: false }) => {
			if (!name) {
				return;
			}
			const result = await form.trigger(name);
			if (result) {
				return false;
			}
			const fieldState = form.getFieldState(name);
			if (opts.debug) {
				console.error(`${name}.fieldState.error`, fieldState.error);
			}
			return fieldState.error;
		},
		[form, name]
	);

	const handleKeyDown = useCallback(
		async (e) => {
			if (!formMeta) {
				return;
			}
			// 若按住 Ctrl 則不處理
			if (e.ctrlKey) {
				return;
			}

			// 按下 Shift 時必須略過不處理, 作為換行
			// if (((e.key === "Enter" && !disableEnter) && !e.shiftKey && !e.altKey) || e.key === "Tab") {
			if (((e.key === "Enter" && !disableEnter)) || e.key === "Tab") {
				if (multiline && e.shiftKey) {
					return;
				}
				// if (e.altKey) {
				// 	e.preventDefault();
				// 	// 獲取當前焦點元素
				// 	const focusedElement = document.activeElement;
				// 	const newEvent = new KeyboardEvent('keydown', {
				// 		key: 'Enter', // 模擬的鍵
				// 		code: e.code, // 使用原始事件的物理鍵代碼
				// 		bubbles: true, // 允許事件冒泡
				// 		cancelable: true, // 允許事件被取消
				// 		// altKey: false, // 明確設置不包含 Alt 鍵
				// 		shiftKey: true
				// 	});

				// 	// 分發新的事件到目標元素
				// 	focusedElement.dispatchEvent(newEvent);
				// 	console.log("alt+Enter 模擬 ShiftEnter");
				// 	return;
				// }
				if (e.key === "Enter") {
					const error = await getError();
					if (error) {
						// 錯誤則不往下傳遞給 DSGGrid
						// e.stopPropagation();
						form.setError(name, error);
						return;
					}
				}
				e.preventDefault();
				if (formMeta) {
					handleFocusNextField(name, {
						setFocus: form.setFocus,
						isFieldDisabled,
						forward: !e.shiftKey,
						e
					});
				}
			}
		},
		[disableEnter, multiline, formMeta, getError, form, name, handleFocusNextField, isFieldDisabled]
	);

	const _placeholder = useMemo(() => {
		if (!placeholder && multiline) {
			return "使用 Shift+Enter 換行";
		}
		return placeholder;
	}, [multiline, placeholder])

	return (
		<ControllerWrapper name={name} control={control} defaultValue={defaultValue} rules={rules}>
			{({ value, onChange, ref, error }) => (

				<TextFieldExView
					value={value}
					multiline={multiline}
					{..._placeholder && {
						placeholder: _placeholder
					}}
					label={label}
					inline={inline}
					inputRef={ref}
					readOnly={readOnly}
					onChange={(e) => {
						if (readOnly) {
							return;
						}
						onChange(e.target.value);
						if (_onChange) {
							_onChange(e.target.value);
						}
					}}
					onKeyDown={handleKeyDown}
					InputLabelProps={{
						...MuiStyles.DEFAULT_INPUT_LABEL_PROPS,
						...InputLabelProps,
						...(labelShrink && { shrink: true }),
					}}
					InputProps={{
						// ...InputProps,
						...InputPropsWithoutEndAdornment,
						// ...slotProps?.input,
						...inputPropsWithoutEndAdornment,
						...(readOnly && {
							readOnly: true,
							// disableUnderline: true,
						}),
						...(renderEndAdornment && {
							endAdornment: (
								<>
									{clearable && (
										<ClearInputButton
											className="clearable"
											value={value}
											onChange={onChange}
										/>
									)}
									{endAdornment}
									{inputEndAdornment}

									{EndAdornmentComponent && (
										<EndAdornmentComponent />
									)}
								</>
							),
						}),
					}}
					inputProps={{
						...inputProps,
						...slotProps?.htmlInput
					}}
					// disabled={disabled}
					error={!!error}
					helperText={error?.message}
					// required={required}

					{...slotProps?.textField}

					{...rest}

				/>

			)}
		</ControllerWrapper>
	)
};

ControlledTextField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	multiline: PropTypes.bool,
	readOnly: PropTypes.bool,
	control: PropTypes.object,
	onChange: PropTypes.func,
	// required: PropTypes.bool,
	rules: PropTypes.object,
	labelShrink: PropTypes.bool,
	defaultValue: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	slotProps: PropTypes.object,
	inputProps: PropTypes.object,
	InputProps: PropTypes.object,
	clearable: PropTypes.bool,
	// 
	disabledBackgroundColor: PropTypes.string,
	EndAdornmentComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	// nextInputRef: PropTypes.object,
	// prevInputRef: PropTypes.object,
	// onKeyDown: PropTypes.func,
	// inputRef: PropTypes.object,
	// shouldSelect: PropTypes.bool,
	InputLabelProps: PropTypes.object,
	inline: PropTypes.bool,
	placeholder: PropTypes.string,

};

export default ControlledTextField;