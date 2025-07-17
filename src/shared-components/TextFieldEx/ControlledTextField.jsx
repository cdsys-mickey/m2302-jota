/* eslint-disable no-mixed-spaces-and-tabs */
import Colors from "@/modules/Colors.mjs";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import PropTypes from "prop-types";
import { useCallback, useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import MuiStyles from "@/shared-modules/MuiStyles";
import ControllerWrapper from "../ControllerWrapper";
import FlexBox from "../FlexBox";
import ClearInputButton from "../input/ClearInputButton";
import TextFieldExView from "./TextFieldExView";

export const ControlledTextField = ({
	name,
	// multiline,
	// inputRef,
	label,
	readOnly = false,
	control,
	onChange: _onChange,
	// onKeyDown,
	rules,
	labelShrink = false,
	defaultValue = "",
	sx = [],
	InputProps,
	inputProps,
	clearable,
	disabled,
	disabledBackgroundColor = "rgba(0,0,0,0.05)",
	EndAdornmentComponent,
	InputLabelProps,
	dense,
	inline,
	required,
	slotProps,
	borderless,
	...rest
}) => {
	const formMeta = useContext(FormMetaContext);
	const { isFieldDisabled, handleFocusNextField, disableEnter } = formMeta || {};
	const inFormMeta = !!formMeta;
	// const { setFocus } = useFormContext() || {};
	const form = useFormContext();
	const { endAdornment, ...InputPropsWithoutEndAdornment } = InputProps || {};
	const { endAdornment: inputEndAdornment, ...inputPropsWithoutEndAdornment } = slotProps?.input || {};

	const _label = useMemo(() => {
		return (inline || borderless) ? "" : label;
	}, [borderless, inline, label])

	const renderEndAdornment = useMemo(() => {
		return EndAdornmentComponent || clearable;
	}, [EndAdornmentComponent, clearable]);

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
			// 若按住 Ctrl 則不處理
			if (e.ctrlKey) {
				return;
			}

			// 按下 Shift 時必須略過不處理
			if (((e.key === "Enter" && !disableEnter) && !e.shiftKey) || e.key === "Tab") {
				if (e.key === "Enter") {
					const error = await getError();
					if (error) {
						// 錯誤則不往下傳遞給 DSGGrid
						// e.stopPropagation();
						form.setError(name, error);
						return;
					}
				}
				if (inFormMeta) {
					e.preventDefault();

					handleFocusNextField(name, {
						setFocus: form.setFocus,
						isFieldDisabled,
						forward: !e.shiftKey,
						e
					});
				}
			}
		},
		[disableEnter, inFormMeta, getError, form, name, handleFocusNextField, isFieldDisabled]
	);

	return (
		<ControllerWrapper name={name} control={control} defaultValue={defaultValue} rules={rules}>
			{({ value, onChange, ref, error }) => (
				<FlexBox block={!inline} sx={{ fontWeight: 700 }}>
					{inline &&
						label
					}
					<TextFieldExView
						value={value}
						// multiline={multiline}
						label={_label}
						inputRef={ref}
						sx={[
							() => ({
								"&:has(.MuiInputBase-input:focus)": {
									// backgroundColor: "rgb(253 253 253)",
								},
								...(disabled && {
									backgroundColor: disabledBackgroundColor,
								}),
								"&:hover .clearable": {
									visibility: "visible",
								},
								...(dense && {
									"& .MuiInputBase-input": {
										paddingLeft: 1,
										paddingTop: 0.2,
										paddingBottom: 0.2,
										paddingRight: 0
									},
								}),
								"& .MuiFormHelperText-root": {
									marginTop: 0
								},
								...(required && !error && {
									"& .MuiInputLabel-root:not(.Mui-focused)": {
										color: Colors.REQUIRED,
									},
									"& .MuiOutlinedInput-root": {
										'& fieldset': {
											borderColor: Colors.REQUIRED,
										},
									}
								}),
								...(borderless && {
									"& input": {
										paddingTop: 0,
										paddingLeft: "4px",
										paddingRight: 0,
									}
								})
							}),
							...(Array.isArray(sx) ? sx : [sx]),
						]}
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
										{endAdornment}
										{inputEndAdornment}
										{clearable && (
											<ClearInputButton
												className="clearable"
												value={value}
												onChange={onChange}
											/>
										)}
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
						disabled={disabled}
						error={!!error}
						helperText={error?.message}
						required={required}
						{
						...(borderless && {
							variant: "filled",
							InputProps: { disableUnderline: true }
						})
						}
						{...slotProps?.textField}

						{...rest}
					/>
				</FlexBox>
			)}
		</ControllerWrapper>
	)

	// return (
	// 	<Controller
	// 		name={name}
	// 		defaultValue={defaultValue}
	// 		control={control}
	// 		rules={rules}
	// 		render={({
	// 			field: { value, onChange, ref },
	// 			fieldState: { error },
	// 		}) => (
	// 			<FlexBox block={!inline} sx={{ fontWeight: 700 }}>
	// 				{inline &&
	// 					label
	// 				}
	// 				<TextField
	// 					value={value}
	// 					// multiline={multiline}
	// 					label={_label}
	// 					inputRef={ref}
	// 					sx={[
	// 						() => ({
	// 							"&:has(.MuiInputBase-input:focus)": {
	// 								// backgroundColor: "rgb(253 253 253)",
	// 							},
	// 							...(disabled && {
	// 								backgroundColor: disabledBackgroundColor,
	// 							}),
	// 							"&:hover .clearable": {
	// 								visibility: "visible",
	// 							},
	// 							...(dense && {
	// 								"& .MuiInputBase-input": {
	// 									paddingLeft: 1,
	// 									paddingTop: 0.2,
	// 									paddingBottom: 0.2,
	// 									paddingRight: 0
	// 								}
	// 							}),
	// 							...(required && !error && {
	// 								"& .MuiInputLabel-root:not(.Mui-focused)": {
	// 									color: Colors.REQUIRED,
	// 								},
	// 								"& .MuiOutlinedInput-root": {
	// 									'& fieldset': {
	// 										borderColor: Colors.REQUIRED,
	// 									},
	// 								}
	// 							})
	// 						}),
	// 						...(Array.isArray(sx) ? sx : [sx]),
	// 					]}
	// 					onChange={(e) => {
	// 						if (readOnly) {
	// 							return;
	// 						}
	// 						onChange(e.target.value);
	// 						if (_onChange) {
	// 							_onChange(e.target.value);
	// 						}
	// 					}}
	// 					onKeyDown={handleKeyDown}
	// 					InputLabelProps={{
	// 						...MuiStyles.DEFAULT_INPUT_LABEL_PROPS,
	// 						...InputLabelProps,
	// 						...(labelShrink && { shrink: true }),
	// 					}}
	// 					InputProps={{
	// 						...InputProps,
	// 						...slotProps?.input,
	// 						...(readOnly && {
	// 							readOnly: true,
	// 							// disableUnderline: true,
	// 						}),
	// 						...(renderEndAdornment && {
	// 							endAdornment: (
	// 								<>
	// 									{clearable && (
	// 										<ClearInputButton
	// 											className="clearable"
	// 											value={value}
	// 											onChange={onChange}
	// 										/>
	// 									)}
	// 									{EndAdornmentComponent && (
	// 										<EndAdornmentComponent />
	// 									)}
	// 								</>
	// 							),
	// 						}),
	// 					}}
	// 					inputProps={{
	// 						...inputProps,
	// 						...slotProps?.htmlInput
	// 					}}
	// 					disabled={disabled}
	// 					error={!!error}
	// 					helperText={error?.message}
	// 					required={required}
	// 					{...rest}
	// 				/>
	// 			</FlexBox>
	// 		)}
	// 	/>
	// );
};

ControlledTextField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	// multiline: PropTypes.bool,
	readOnly: PropTypes.bool,
	control: PropTypes.object,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	rules: PropTypes.object,
	labelShrink: PropTypes.bool,
	defaultValue: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	slotProps: PropTypes.object,
	inputProps: PropTypes.object,
	InputProps: PropTypes.object,
	clearable: PropTypes.bool,
	disabled: PropTypes.bool,
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
	dense: PropTypes.bool,
	inline: PropTypes.bool,
	borderless: PropTypes.bool,
};
