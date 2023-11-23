import { ListItem } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo, forwardRef } from "react";
import SideMenus from "@/modules/md-sidemenu";
import { FrameMenuGroupHeader } from "./FrameMenuGroupHeader";
import FrameMenuItemButtonContainer from "./FrameMenuItemButtonContainer";

const PADDING_SIZE = 8;

const RWFrameMenuRow = memo(
	forwardRef((props, ref) => {
		const { index, style, data } = props;
		const value = data[index];
		const header = useMemo(() => SideMenus.isHeader(value), [value]);

		return (
			<div
				ref={ref}
				style={{
					...style,
					top: `${parseFloat(style.top) + PADDING_SIZE}px`,
				}}>
				<ListItem dense disablePadding>
					{header ? (
						<FrameMenuGroupHeader
							Icon={SideMenus.getHeaderIcon(value)}
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
			</div>
		);
	})
);

RWFrameMenuRow.propTypes = {
	index: PropTypes.number,
	style: PropTypes.object,
	data: PropTypes.array,
};

RWFrameMenuRow.displayName = "RWFrameMenuRow";
export default RWFrameMenuRow;
