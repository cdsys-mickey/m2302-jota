import { useContext } from "react";
import DeptSwitchMenuItem from "./DeptSwitchMenuItem";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useCallback } from "react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import Auth from "@/modules/md-auth";

export const DeptSwitchMenuItemContainer = (props) => {
	const { onMenuClose, ...rest } = props;
	const auth = useContext(AuthContext);
	const { operator } = auth;

	const title = useMemo(() => {
		return `${auth.operator?.CurDeptName} ${auth.operator?.UserName}`;
	}, [auth.operator?.CurDeptName, auth.operator?.UserName]);

	const color = useMemo(
		() => Auth.getHeaderColor(operator.Class),
		[operator.Class]
	);

	const handleClick = useCallback(() => {
		auth.promptDeptSwitch();
		onMenuClose();
	}, [auth, onMenuClose]);

	return (
		<DeptSwitchMenuItem
			bgcolor={color}
			title={title}
			onClick={handleClick}
			{...rest}
		/>
	);
};
DeptSwitchMenuItemContainer.propTypes = {
	onMenuClose: PropTypes.func,
};
DeptSwitchMenuItemContainer.displayName = "DeptSwitchMenuItemContainer";
