/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { isValid } from "date-fns";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import DateFormats from "@/shared-modules/sd-date-formats";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useContext } from "react";
import { FormMetaContext } from "../../shared-contexts/form-meta/FormMetaContext";
import { useChangeTracking } from "../../shared-hooks/useChangeTracking";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const DEFAULT_PROPS = {
	size: "small",
	InputLabelProps: {
		shrink: true,
	},
};

const ControlledDatePicker = ({
	label = "日期",
	name,
	control,
	readOnly,
	dense,
	clearable = false,
	defaultValue,
	onChange: _onChange,
	onChanged,
	mask = "____/__/__",
	format = DateFormats.DATEFNS_DATE,
	invalidDateMessage = "日期格式錯誤",
	required = false,
	rules,
	// labelShrink,
	// variant = "outlined",
	...rest
}) => {
	// console.log("rendering ControlledDatePicker");
	const { setError, clearErrors } = useFormContext();
	const { isFieldDisabled, focusNextField, disableEnter } = useContext(FormMetaContext) || {};
	// const { setFocus } = useFormContext() || {};
	const form = useFormContext();
	const { InputProps, ...opts } = DEFAULT_PROPS;

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
			//if (e.key === "Enter" || e.key === "Tab") {
			if (((e.key === "Enter" && !disableEnter) && !e.shiftKey) || e.key === "Tab") {
				const error = await getError();
				if (error) {
					// 錯誤則不往下傳遞給 DSGGrid
					// e.stopPropagation();
					form.setError(name, error);
					return;
				}
				if (focusNextField) {
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
		[disableEnter, getError, focusNextField, form, name, isFieldDisabled]
	);

	if (!name) {
		return <DatePicker {...rest} />;
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue || null}
			control={control}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => (
				<DatePicker
					// autoOk
					inputRef={ref}
					label={label ? `${label}${required ? "*" : ""}` : ""}
					mask={mask}
					format={format}
					slotProps={{
						inputAdornment: {
							sx: {
								...(dense && {
									'& .MuiSvgIcon-root': { fontSize: '18px' }
								})
							}
						},
						textField: {
							size: "small",
							onKeyDown: handleKeyDown,
							InputLabelProps: {
								...MuiStyles.DEFAULT_INPUT_LABEL_PROPS,
								...(dense && {
									shrink: true,
								})
							},
						},
						sx: {
							...(dense && {
								"& .MuiInputBase-input":
								{
									paddingTop: "4px",
									paddingBottom: "4px",
									// paddingLeft: "2px",
									// paddingRight: "40px",
								},
							})
						},
						field: {
							clearable
						}
					}}
					value={value}
					onChange={
						readOnly
							? null
							: (newValue) => {
								// 為了正確反應鍵盤操作, 即使格式錯誤還是照樣 render
								if (_onChange) {
									_onChange(newValue);
								}

								onChange(newValue);

								if (onChanged) {
									onChanged(newValue);
								}

								if (isValid(newValue)) {
									if (clearErrors) {
										clearErrors(name);
									}
								} else {
									if (setError) {
										setError(name, {
											message: "日期格式錯誤",
										});
									}
								}
							}
					}
					onKeyDown={handleKeyDown}
					InputProps={{
						...InputProps,
						...(readOnly && { readOnly: true }),
					}}
					{...opts}
					disabled={readOnly}
					// onError={(err) => {
					// 	console.error(err);
					// }}
					{...rest}
					invalidDateMessage={invalidDateMessage}
				/>
			)
			}
		/>
	);
};
ControlledDatePicker.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	control: PropTypes.object,
	dense: PropTypes.bool,
	readOnly: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	onChange: PropTypes.func,
	onChanged: PropTypes.func,
	mask: PropTypes.string,
	format: PropTypes.string,
	invalidDateMessage: PropTypes.string,
	required: PropTypes.bool,
	rules: PropTypes.object,
	clearable: PropTypes.bool,
	// variant: PropTypes.string,
};
export default ControlledDatePicker;
