import React from "react";
import { Controller } from "react-hook-form";
import CheckboxEx from "@/shared-components/CheckboxEx";

const ControlledCheckboxEx = ({
	name,
	readOnly,
	control,
	rules,
	onChange: handleCheckChange,
	getValue,
	getChecked,
	defaultValue = null,
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<CheckboxEx
					checked={getChecked ? getChecked(value) : value}
					onChange={
						readOnly
							? null
							: (e) => {
									if (handleCheckChange) {
										handleCheckChange(e);
									}
									onChange(
										getValue
											? getValue(e.target.checked)
											: e.target.checked
									);
							  }
					}
					inputProps={
						readOnly
							? { readOnly: true, disableUnderline: true }
							: null
					}
					disabled={readOnly}
					error={error}
					helperText={error?.message}
					{...rest}
				/>
			)}
		/>
	);
};

export default React.memo(ControlledCheckboxEx);
