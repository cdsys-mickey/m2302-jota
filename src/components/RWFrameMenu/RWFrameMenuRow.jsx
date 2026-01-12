import { ListItem } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo, forwardRef, useContext } from "react";
import SideMenu from "@/modules/SideMenu.mjs";
import FrameMenuContext from "../FrameMenu/FrameMenuContext";
import { FrameMenuGroupHeader } from "../FrameMenu/FrameMenuGroupHeader";
import FrameMenuItemButtonContainer from "../FrameMenu/FrameMenuItemButtonContainer";
import { FrameMenuReminder } from "../FrameMenu/FrameMenuReminder";

const RWFrameMenuRow = memo(
	forwardRef((props, ref) => {
		const { index, style, data } = props;
		const value = data[index];
		const reminder = useMemo(() => SideMenu.isReminder(value), [value]);
		const header = useMemo(() => SideMenu.isHeader(value) && !SideMenu.isReminder(value), [value]);
		const frameMenu = useContext(FrameMenuContext);
		const { dense } = frameMenu;

		const renderContent = () => {
			if (header) {
				return (
					<FrameMenuGroupHeader
						iconComponent={SideMenu.getHeaderIcon(value)}
						text={value.JobName}
						dense={dense}
					/>
				);
			}

			if (reminder) {
				return <FrameMenuReminder label={value?.label} severity={value?.severity} />;
			}

			return (
				<FrameMenuItemButtonContainer
					value={value}
					dense={dense}
				/>
			);
		};

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
					{renderContent()}
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
