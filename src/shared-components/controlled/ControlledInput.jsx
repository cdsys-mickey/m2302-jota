import { FormGroup, FormHelperText, Input, InputLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const ControlledInput = ({
	name,
	readOnly,
	control,
	label,
	onChange: handleInputChange,
	required = false,
	rules,
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={""}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<FormGroup>
					<InputLabel
						htmlFor="component-simple"
						shrink
						required={label && required}>
						{label}
					</InputLabel>
					<Input
						value={value}
						onChange={
							readOnly
								? null
								: (e) => {
										onChange(e.target.value);
										if (handleInputChange) {
											handleInputChange(e.target.value);
										}
								  }
						}
						// InputProps={
						// 	readOnly
						// 		? { readOnly: true, disableUnderline: true }
						// 		: null
						// }
						{...(readOnly && {
							readOnly: true,
							// disableUnderline: true,
						})}
						disabled={readOnly}
						id="component-simple"
						sx={{
							width: "10ch",
						}}
						{...rest}
					/>

					{!!error && (
						<FormHelperText error={!!error}>
							{error?.message || "error"}
						</FormHelperText>
					)}
				</FormGroup>
			)}
		/>
	);
};

export default React.memo(ControlledInput);
// export default ControlledInput;
