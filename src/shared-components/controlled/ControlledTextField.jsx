/* eslint-disable no-mixed-spaces-and-tabs */
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useContext, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ClearInputButton from "../input/ClearInputButton";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import MuiStyles from "../../shared-modules/sd-mui-styles";

export const ControlledTextField = ({
	name,
	// multiline,
	// inputRef,
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

	...rest
}) => {
	const { isFieldDisabled, nextField, disableEnter } = useContext(FormMetaContext) || {};
	const { setFocus } = useFormContext() || {};

	const renderEndAdornment = useMemo(() => {
		return EndAdornmentComponent || clearable;
	}, [EndAdornmentComponent, clearable]);

	const handleKeyDown = useCallback(
		(e) => {
			// 按下 Shift 時必須略過不處理
			if (((e.key === "Enter" && !disableEnter) && !e.shiftKey) || e.key === "Tab") {
				if (nextField) {
					e.preventDefault();

					nextField(name, {
						setFocus,
						isFieldDisabled,
						forward: !e.shiftKey,
						e
					});
				}
			}
		},
		[disableEnter, nextField, name, setFocus, isFieldDisabled]
	);

	if (!name) {
		return (
			<TextField
				// multiline={multiline}
				sx={[
					(theme) => ({
						"&:has(.MuiInputBase-input:focus)": {
							// backgroundColor: "rgb(253 253 253)",
						},
						"& .MuiOutlinedInput-root": {
							paddingRight: theme.spacing(1),
						},
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
				<TextField
					value={value}
					// multiline={multiline}
					inputRef={ref}
					sx={[
						(theme) => ({
							"&:has(.MuiInputBase-input:focus)": {
								// backgroundColor: "rgb(253 253 253)",
							},
							"& .MuiOutlinedInput-root": {
								paddingRight: theme.spacing(1),
							},
							...(disabled && {
								backgroundColor: disabledBackgroundColor,
							}),
							"&:hover .clearable": {
								visibility: "visible",
							},
							"& .clearable": {
								visibility: "hidden",
							},
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
					{...rest}
				/>
			)}
		/>
	);
};

ControlledTextField.propTypes = {
	name: PropTypes.string,
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
};
