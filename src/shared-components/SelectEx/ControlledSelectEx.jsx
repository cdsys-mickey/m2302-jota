import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import SelectExView from "./SelectExView";

const ControlledSelectEx = ({
	name,
	control,
	rules,
	defaultValue = null,
	onChange: handleChange,
	...rest
}) => {

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { ref, value, onChange }, fieldState: { error } }) => {
				return (
					<SelectExView
						name={name}
						ref={ref}
						value={value}
						onChange={(e) => {
							onChange(e.target.value);
							if (handleChange) {
								handleChange(e.target.value);
							}
						}}
						error={!!error}
						helperText={error?.message}
						{...rest}
					/>
				);
			}}
		/>
	);
};

ControlledSelectEx.displayName = "ControlledSelectEx";
ControlledSelectEx.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object,
	rules: PropTypes.object,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	getOptionKey: PropTypes.func
};
export default ControlledSelectEx;