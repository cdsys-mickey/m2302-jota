import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const ControlledTextField = ({
	name,
	readOnly = false,
	control,
	onChange: handleTextChange,
	required = false,
	rules,
	labelShrink = false,
	defaultValue = "",
	sx = [],
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<TextField
					required={required}
					value={value}
					sx={[
						{
							"&:has(.MuiInputBase-input:focus)": {
								backgroundColor: "rgb(253 253 253)",
							},
						},
						...(Array.isArray(sx) ? sx : [sx]),
					]}
					onChange={
						readOnly
							? null
							: (e) => {
									onChange(e.target.value);
									if (handleTextChange) {
										handleTextChange(e.target.value);
									}
							  }
					}
					InputProps={
						readOnly
							? { readOnly: true, disableUnderline: true }
							: null
					}
					disabled={readOnly}
					InputLabelProps={{
						...(labelShrink && { shrink: true }),
					}}
					error={!!error}
					helperText={error?.message}
					{...rest}
				/>
			)}
		/>
	);
};
