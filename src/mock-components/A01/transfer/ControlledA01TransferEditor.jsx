import React from "react";
import { Controller } from "react-hook-form";
import A01TransferEditor from "./A01TransferEditor";

const ControlledA01TransferEditor = ({
	ref,
	name,
	control,
	rules,
	defaultValue = [],
	onChange: handleChange,
	...rest
}) => {
	if (!name) {
		throw Error("prop name is required");
	}
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<A01TransferEditor
					ref={ref}
					value={value}
					onChange={(newValue) => {
						console.log("newValue", newValue);
						onChange(newValue);
						// if (handleChange) {
						// 	handleChange(newValue);
						// }
					}}
					error={error}
					// helperText={error?.message}
					{...rest}
				/>
			)}
		/>
	);
};

export default React.memo(ControlledA01TransferEditor);
