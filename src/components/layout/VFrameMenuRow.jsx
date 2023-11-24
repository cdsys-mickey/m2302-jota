import { ListItem } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import SideMenus from "@/modules/md-sidemenu";
import { FrameMenuGroupHeader } from "./FrameMenuGroupHeader";
import FrameMenuItemButtonContainer from "./FrameMenuItemButtonContainer";

const VFrameMenuRow = memo((props) => {
	const { index, value } = props;
	const header = useMemo(() => SideMenus.isHeader(value), [value]);

	return (
		<ListItem dense disablePadding>
			{header ? (
				<FrameMenuGroupHeader
					iconComponent={SideMenus.GROUP_ICONS[value.JobID]}
					text={value.JobName}
				/>
			) : (
				<FrameMenuItemButtonContainer
					value={value}
					// code={value.JobID}
					// primary={value.JobName}
				/>
			)}
		</ListItem>
	);
});

VFrameMenuRow.propTypes = {
	index: PropTypes.number,
	value: PropTypes.object,
};

VFrameMenuRow.displayName = "VFrameMenuRow";
export default VFrameMenuRow;
