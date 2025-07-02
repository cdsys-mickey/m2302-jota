import React from "react";
// import { DatePicker } from "@mui/lab";
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { isValid } from "date-fns";
import { Controller, useFormContext } from "react-hook-form";
import DateFormats from "@/shared-modules/DateFormats.mjs";

const ControlledDateTimePicker = ({
	label = "日期",
	name,
	control,
	defaultValue,
	onChange: handleDateChange,
	invalidDateMessage = "日期格式錯誤",
	required = false,
	rules,
	labelShrink,
	...rest
}) => {
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
				<DateTimePicker
					// autoOk
					inputRef={ref}
					label={label ? `${label}${required ? "*" : ""}` : ""}
					mask="____/__/__ __:__:__"
					inputFormat={DateFormats.DATEFNS_DATETIME_SECONDS}
					value={value}
					onChange={(newValue, _) => {
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
								setError(name, { message: "日期格式錯誤" });
							}
						}
					}}
					onError={(err) => {
						console.error(err);
					}}
					renderInput={(textFieldProps) => {
						// console.log(TextFieldProps, "TextFieldProps");
						return (
							<TextField
								{...textFieldProps}
								// 必須 override TextFieldProps 傳來的 error 屬性
								error={!!error}
								helperText={error?.message}
								InputLabelProps={{
									...(labelShrink && { shrink: true }),
								}}
								{...rest}
							/>
						);
					}}
					invalidDateMessage={invalidDateMessage}
				/>
			)}
		/>
	);
};

export default React.memo(ControlledDateTimePicker);
