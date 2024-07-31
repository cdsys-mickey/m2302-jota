import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { CaptchaField } from "./CaptchaField";

export const ControlledCaptchaField = ({
	name,
	control,
	rules,
	defaultValue = null,
	onInputChange,
	// onChange: _onChange,
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => (
				<CaptchaField
					inputRef={ref}
					value={value}
					onChange={(s) => {
						onChange(s);
						if (onInputChange) {
							onInputChange(s);
						}
					}}
					error={error}
					{...rest}
				/>
			)}
		/>
	);
};

ControlledCaptchaField.displayName = "ControlledCaptchaField";
ControlledCaptchaField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object,
	rules: PropTypes.object,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	onInputChange: PropTypes.func,
};
