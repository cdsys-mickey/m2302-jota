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

const DEFAULT_PROPS = {
	size: "small",
	InputLabelProps: {
		shrink: true,
	},
};

const ControlledDatePicker = ({
	label = "日期",
	name,
	readOnly,
	control,
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
	const { isFieldDisabled, nextField } = useContext(FormMetaContext) || {};
	const { setFocus } = useFormContext() || {};
	const { InputProps, ...opts } = DEFAULT_PROPS;

	const handleKeyDown = useCallback(
		(e) => {
			if (e.key === "Enter" || e.key === "Tab") {
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
		[nextField, name, setFocus, isFieldDisabled]
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
						textField: {
							size: "small",
							onKeyDown: handleKeyDown,
						},
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
			)}
		/>
	);
};
ControlledDatePicker.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	readOnly: PropTypes.bool,
	control: PropTypes.object,
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
	// labelShrink: PropTypes.bool,
	// variant: PropTypes.string,
};
export default ControlledDatePicker;
