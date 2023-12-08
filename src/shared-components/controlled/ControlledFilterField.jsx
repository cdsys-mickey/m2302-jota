import { Controller } from "react-hook-form";
import FilterField from "@/shared-components/filter-field/FilterField";
import PropTypes from "prop-types";

const ControlledFilterField = ({ name, defaultValue = "", rules, ...rest }) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field: { ref, value, onChange } }) => {
				return (
					<FilterField
						ref={ref}
						value={value}
						onChange={onChange}
						{...rest}
					/>
				);
			}}
		/>
	);
};

ControlledFilterField.propTypes = {
	name: PropTypes.string.isRequired,
	defaultValue: PropTypes.string,
	onChange: PropTypes.func,
	rules: PropTypes.object,
};
export default ControlledFilterField;
