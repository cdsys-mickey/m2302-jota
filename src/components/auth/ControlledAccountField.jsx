import React, { memo } from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const ControlledAccountField = memo((props) => {
	const {
		name,
		control,
		rules = {
			required: "請輸入帳號",
		},
		...rest
	} = props;
	return (
		<Controller
			name={name}
			control={control}
			defaultValue=""
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<TextField
					variant="outlined"
					label="帳號"
					fullWidth
					value={value}
					onChange={onChange}
					error={!!error}
					helperText={error?.message}
					{...rest}
				/>
			)}
		/>
	);
});

ControlledAccountField.displayName = "ControlledAccountField";

export default ControlledAccountField;
