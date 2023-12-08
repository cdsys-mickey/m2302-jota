/* eslint-disable no-mixed-spaces-and-tabs */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

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
	EndAdornmentComponent,
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
					InputProps={{
						...(readOnly && {
							readOnly: true,
							disableUnderline: true,
						}),
						...(EndAdornmentComponent && {
							endAdornment: (
								<EndAdornmentComponent
									value={value}
									onChange={onChange}
								/>
							),
						}),
					}}
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

ControlledTextField.propTypes = {
	EndAdornmentComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
};
