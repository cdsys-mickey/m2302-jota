import React from "react";
import { Controller } from "react-hook-form";
import { RememberMeCheckbox } from "./RememberMeCheckbox";

const ControlledRememberMeCheckbox = ({
	name,
	onChange: handleChange,
	...rest
}) => (
	<Controller
		name={name}
		render={({ field: { value, onChange } }) => (
			<RememberMeCheckbox
				checked={value}
				onChange={(newValue) => {
					onChange(newValue);
					if (handleChange) {
						handleChange(newValue);
					}
				}}
				{...rest}
			/>
		)}
	/>
);
export default ControlledRememberMeCheckbox;
