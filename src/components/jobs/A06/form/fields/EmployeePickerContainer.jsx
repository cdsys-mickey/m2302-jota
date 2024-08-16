import { AuthContext } from "@/contexts/auth/AuthContext";
import Employees from "@/modules/md-employees";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const TypoEmployeePickerContainer = forwardRef((props, ref) => {
	const { name, label = "員工", ...rest } = props;
	const { token } = useContext(AuthContext);


	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/ou/employees`}
			getOptionLabel={Employees.getOptionLabel}
			isOptionEqualToValue={Employees.isOptionEqualToValue}
			{...rest} />
	);
});
TypoEmployeePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
};

TypoEmployeePickerContainer.displayName = "TypoEmployeePickerContainer";
export default TypoEmployeePickerContainer;
