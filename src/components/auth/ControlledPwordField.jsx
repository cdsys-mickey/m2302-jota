import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const ControlledPwordField = (props) => {
	const {
		name,
		required,
		control,
		label = "密碼",
		rules = { required: "請輸入密碼" },
		...rest
	} = props;
	return (
		<Controller
			name={name}
			defaultValue=""
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<TextField
					required={required}
					variant="outlined"
					type="password"
					label={label}
					value={value}
					onChange={onChange}
					error={!!error}
					helperText={error?.message}
					inputProps={{
						autoComplete: "new-password",
					}}
					{...rest}
				/>
			)}
		/>
	);
};

export default ControlledPwordField;
