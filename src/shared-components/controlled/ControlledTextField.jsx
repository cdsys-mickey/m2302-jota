/* eslint-disable no-mixed-spaces-and-tabs */
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useCallback, useContext, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import MuiStyles from "../../shared-modules/sd-mui-styles";
import FlexBox from "../FlexBox";
import ClearInputButton from "../input/ClearInputButton";
import { orange } from "@mui/material/colors";
import Colors from "@/modules/md-colors";

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
	clearable,
	disabled,
	disabledBackgroundColor = "rgba(0,0,0,0.05)",
	EndAdornmentComponent,
	InputLabelProps,
	dense,
	inline,
	required,
	...rest
}) => {
	const formMeta = useContext(FormMetaContext);
	const { isFieldDisabled, focusNextField, disableEnter } = formMeta || {};
	const inFormMeta = !!formMeta;
	// const { setFocus } = useFormContext() || {};
	const form = useFormContext();

	const _label = useMemo(() => {
		return inline ? "" : label;
	}, [inline, label])

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

					focusNextField(name, {
						setFocus: form.setFocus,
						isFieldDisabled,
						forward: !e.shiftKey,
						e
					});
				}
			}
		},
		[disableEnter, inFormMeta, getError, form, name, focusNextField, isFieldDisabled]
	);

	const BoxComponent = useMemo(() => {
		return inline ? FlexBox : Box;
	}, [inline]);

	if (!name) {
		return (
			<TextField
				// multiline={multiline}
				label={_label}
				sx={[
					(theme) => ({
						"&:has(.MuiInputBase-input:focus)": {
							// backgroundColor: "rgb(253 253 253)",
						},
						// "& .MuiOutlinedInput-root": {
						// 	paddingRight: theme.spacing(1),
						// },
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				onChange={_onChange}
				onKeyDown={handleKeyDown}
				InputLabelProps={{
					...MuiStyles.DEFAULT_INPUT_LABEL_PROPS,
					...InputLabelProps,
					...(labelShrink && { shrink: true }),
				}}
				InputProps={{
					...(readOnly && {
						readOnly: true,
						// disableUnderline: true,
					}),
					...(renderEndAdornment && {
						endAdornment: (
							<>
								{EndAdornmentComponent && (
									<EndAdornmentComponent />
								)}
							</>
						),
					}),
				}}
				disabled={disabled}
				required={required}
				{...rest}
			/>
		);
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({
				field: { value, onChange, ref },
				fieldState: { error },
			}) => (
				<BoxComponent inline sx={{ fontWeight: 700 }}>
					{inline &&
						label
					}
					<TextField
						value={value}
						// multiline={multiline}
						label={_label}
						inputRef={ref}
						sx={[
							(theme) => ({
								"&:has(.MuiInputBase-input:focus)": {
									// backgroundColor: "rgb(253 253 253)",
								},
								// "& .MuiOutlinedInput-root": {
								// 	paddingRight: theme.spacing(1),
								// },
								...(disabled && {
									backgroundColor: disabledBackgroundColor,
								}),
								"&:hover .clearable": {
									visibility: "visible",
								},
								// "& .clearable": {
								// 	visibility: "hidden",
								// },
								...(dense && {
									"& .MuiInputBase-input": {
										paddingLeft: 1,
										paddingTop: 0.2,
										paddingBottom: 0.2,
										paddingRight: 0
									}
								}),
								...(required && !error && {
									"& .MuiInputLabel-root:not(.Mui-focused)": {
										color: Colors.REQUIRED,
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
										{EndAdornmentComponent && (
											<EndAdornmentComponent />
										)}
									</>
								),
							}),
						}}
						disabled={disabled}
						error={!!error}
						helperText={error?.message}
						required={required}
						{...rest}
					/>
				</BoxComponent>
			)}
		/>
	);
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
};
