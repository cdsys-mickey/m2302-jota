import { ListItem } from "@mui/material";
import { memo } from "react";
import FrameMenuItemButton from "./FrameMenuItemButton";
import PropTypes from "prop-types";
import { useMemo } from "react";
import SideMenus from "../../modules/md-sidemenu";
import { FrameMenuGroupHeader } from "./FrameMenuGroupHeader";
import FrameMenuItemButtonContainer from "./FrameMenuItemButtonContainer";

const VirtualizedFrameMenuRow = memo((props) => {
	const { index, style, data } = props;
	const value = data[index];
	const header = useMemo(() => SideMenus.isHeader(value), [value]);

	return (
		<div style={style}>
			<ListItem dense disablePadding>
				{header ? (
					<FrameMenuGroupHeader
						Icon={SideMenus.GROUP_ICONS[value.JobID]}
						text={value.JobName}
					/>
				) : (
					<FrameMenuItemButtonContainer
						code={value.JobID}
						primary={value.JobName}
					/>
				)}
			</ListItem>
		</div>
	);
});

VirtualizedFrameMenuRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	data: PropTypes.array,
};

VirtualizedFrameMenuRow.displayName = "VirtualizedFrameMenuRow";
export default VirtualizedFrameMenuRow;
