import { memo } from "react";
import PropTypes from "prop-types";
import { ListItemIcon, MenuItem, Tooltip } from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";

const DeptSwitchMenuItem = memo((props) => {
	const { title, ...rest } = props;
	return (
		<Tooltip title="切換門市" placement="bottom-end">
			<MenuItem {...rest}>
				<ListItemIcon>
					<RepeatIcon fontSize="small" />
				</ListItemIcon>
				{title}
			</MenuItem>
		</Tooltip>
	);
});

DeptSwitchMenuItem.propTypes = {
	title: PropTypes.string,
};

DeptSwitchMenuItem.displayName = "DeptSwitchMenuItem";
export default DeptSwitchMenuItem;
