import CheckboxExGroup from "@/shared-components/checkbox-group/CheckboxExGroup";
import { memo } from "react";
import Depts from "../modules/md-depts";
import PropTypes from "prop-types";
import { CheckboxExGroupContainer } from "../shared-components/checkbox-group/CheckboxExGroupContainer";

const UserDeptCheckboxGroup = memo((props) => {
	const { ...rest } = props;

	return <CheckboxExGroupContainer {...rest} />;
});

UserDeptCheckboxGroup.propTypes = {
	loading: PropTypes.bool,
};

UserDeptCheckboxGroup.displayName = "UserDeptCheckboxGroup";
export default UserDeptCheckboxGroup;