import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { useWatch } from "react-hook-form";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import Employees from "@/modules/md-employees";

const TypoEmployeePickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "員工", ...rest } = props;
	const { token } = useContext(AuthContext);
	const value = useWatch({
		name,
	});

	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/ou/employees`}
			getOptionLabel={Employees.getOptionLabel}
			isOptionEqualToValue={Employees.isOptionEqualToValue}
			{...rest}>
			{children || Employees.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoEmployeePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoEmployeePickerContainer.displayName = "TypoEmployeePickerContainer";
export default TypoEmployeePickerContainer;
