import { ListItemIcon, MenuItem } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BugReportIcon from "@mui/icons-material/BugReport";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import Auth from "../../../modules/md-auth";

export const GotoKitchenMenuItemContainer = (props) => {
	const { children = "元件測試", ...rest } = props;
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	const gotoKitchen = useCallback(() => {
		navigate(
			{
				pathname: "/lab-protected/kitchen-sink",
			},
			{
				replace: true,
			}
		);
	}, [navigate]);

	if (!auth.operator.isRoot) {
		return false;
	}

	return (
		<MenuItem onClick={gotoKitchen} {...rest}>
			<ListItemIcon>
				<BugReportIcon fontSize="small" />
			</ListItemIcon>
			{children}
		</MenuItem>
	);
};
GotoKitchenMenuItemContainer.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};
GotoKitchenMenuItemContainer.displayName = "GotoKitchenMenuItemContainer";
