/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { isValid } from "date-fns";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import DateFormats from "@/shared-modules/sd-date-formats";
import PropTypes from "prop-types";

const ControlledDatePicker = ({
	label = "日期",
	name,
	readOnly,
	control,
	defaultValue,
	onChange: onPickerChange,
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
						},
					}}
					value={value}
					onChange={
						readOnly
							? null
							: (newValue) => {
									// 為了正確反應鍵盤操作, 即使格式錯誤還是照樣 render
									if (onPickerChange) {
										onPickerChange(newValue);
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
					InputProps={{
						...(readOnly && { readOnly: true }),
					}}
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
