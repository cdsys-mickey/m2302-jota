import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { CaptchaField } from "./CaptchaField";

export const ControlledCaptchaField = ({
	name,
	control,
	rules,
	defaultValue = null,
	onInputChange,
	validate,
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
					rules={{
						validate
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
	validate: PropTypes.func,
};
