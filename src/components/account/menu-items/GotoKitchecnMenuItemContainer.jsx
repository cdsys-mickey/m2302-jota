import BugReportIcon from "@mui/icons-material/BugReport";
import { ListItemIcon, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/AuthContext";

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

	if (!auth.operator.hasRoot) {
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
