/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { isValid } from "date-fns";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import DateFormats from "@/shared-modules/sd-date-formats";

const ControlledDatePicker = ({
	label = "日期",
	name,
	readOnly,
	control,
	defaultValue,
	onChange: handleDateChange,
	mask = "____/__/__",
	format = DateFormats.DATEFNS_DATE,
	invalidDateMessage = "日期格式錯誤",
	required = false,
	rules,
	labelShrink,
	variant = "outlined",
	...rest
}) => {
	console.log("rendering ControlledDatePicker");
	const { setError, clearErrors } = useFormContext();
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
							: (newValue, _) => {
									// 為了正確反應鍵盤操作, 即使格式錯誤還是照樣 render
									onChange(newValue);
									if (handleDateChange) {
										handleDateChange(newValue);
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

export default ControlledDatePicker;
