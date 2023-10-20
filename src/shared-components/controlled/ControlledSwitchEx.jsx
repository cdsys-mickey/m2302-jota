import React from "react";
import { Controller } from "react-hook-form";
import SwitchEx from "@/shared-components/SwitchEx";

const ControlledSwitchEx = ({
	name,
	control,
	rules,
	onChange: handleSwitchChange,
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
				<SwitchEx
					checked={getChecked ? getChecked(value) : value}
					onChange={(e) => {
						onChange(
							getValue
								? getValue(e.target.checked)
								: e.target.checked
						);
						if (handleSwitchChange) {
							handleSwitchChange(e.target.checked);
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

export default React.memo(ControlledSwitchEx);
