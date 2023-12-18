import { useContext } from "react";
import DeptSwitchMenuItem from "./DeptSwitchMenuItem";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { useCallback } from "react";
import PropTypes from "prop-types";

export const DeptSwitchMenuItemContainer = (props) => {
	const { onMenuClose, ...rest } = props;
	const auth = useContext(AuthContext);

	const handleClick = useCallback(() => {
		auth.promptDeptSwitch();
		onMenuClose();
	}, [auth, onMenuClose]);

	return <DeptSwitchMenuItem onClick={handleClick} {...rest} />;
};
DeptSwitchMenuItemContainer.propTypes = {
	onMenuClose: PropTypes.func,
};
DeptSwitchMenuItemContainer.displayName = "DeptSwitchMenuItemContainer";
