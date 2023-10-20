import { Controller } from "react-hook-form";
import SearchField from "@/shared-components/SearchField";

const ControlledSearchField = ({ name, ...rest }) => {
	return (
		<Controller
			name={name}
			defaultValue=""
			render={({ field: { value, onChange } }) => (
				<SearchField value={value} onChange={onChange} {...rest} />
			)}
		/>
	);
};

export default ControlledSearchField;
