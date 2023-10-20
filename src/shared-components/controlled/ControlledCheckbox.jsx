import { Checkbox } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const ControlledCheckbox = ({
	name,
	control,
	rules,
	onChange: handleChange,
	getValue,
	getChecked,
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={null}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<Checkbox
					checked={getChecked ? getChecked(value) : value}
					onChange={(e) => {
						onChange(
							getValue
								? getValue(e.target.checked)
								: e.target.checked
						);
						if (handleChange) {
							handleChange(e.target.checked);
						}
					}}
					error={error}
					helperText={error?.message}
					{...rest}
				/>
			)}
		/>
	);
};

export default React.memo(ControlledCheckbox);
