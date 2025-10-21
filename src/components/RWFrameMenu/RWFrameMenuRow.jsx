import { ListItem } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo, forwardRef, useContext } from "react";
import SideMenu from "@/modules/SideMenu.mjs";
import FrameMenuContext from "../FrameMenu/FrameMenuContext";
import { FrameMenuGroupHeader } from "../FrameMenu/FrameMenuGroupHeader";
import FrameMenuItemButtonContainer from "../FrameMenu/FrameMenuItemButtonContainer";

const PADDING_SIZE = 8;

const RWFrameMenuRow = memo(
	forwardRef((props, ref) => {
		const { index, style, data } = props;
		const value = data[index];
		const header = useMemo(() => SideMenu.isHeader(value), [value]);
		const frameMenu = useContext(FrameMenuContext);
		const { dense } = frameMenu;

		return (
			<div
				ref={ref}
				className={SideMenu.ITEM_CLASSNAME}
				style={{
					...style,
					// top: `${parseFloat(style.top) + PADDING_SIZE}px`,
					// paddingTop: `${PADDING_SIZE}px`,
				}}>
				<ListItem dense disablePadding>
					{header ? (
						<FrameMenuGroupHeader
							iconComponent={SideMenu.getHeaderIcon(value)}
							text={value.JobName}
							dense={dense}
						/>
					) : (
						<FrameMenuItemButtonContainer
							value={value}
							dense={dense}
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
