import { P14Context } from "@/modules/P14/P14Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const P14Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const p14 = useContext(P14Context);
	return (
		<SideDrawer anchor={anchor} open={p14.sideDrawerOpen} onClose={p14.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{p14.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{p14.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

P14Drawer.propTypes = {
	anchor: PropTypes.string,
}

P14Drawer.displayName = "P14Drawer";
export default P14Drawer;

