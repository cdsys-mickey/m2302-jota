import { Controller } from "react-hook-form";
import SearchField from "@/shared-components/search-field/SearchField";
import PropTypes from "prop-types";

const ControlledSearchField = ({ name, ...rest }) => {
	return (
		<Controller
			name={name}
			defaultValue=""
			render={({ field: { value, onChange } }) => {
				return (
					<SearchField value={value} onChange={onChange} {...rest} />
				);
			}}
		/>
	);
};

ControlledSearchField.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
};
export default ControlledSearchField;
