import { D07Context } from "@/contexts/D07/D07Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const D07Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const d07 = useContext(D07Context);
	return (
		<SideDrawer anchor={anchor} open={d07.sideDrawerOpen} onClose={d07.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{d07.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{d07.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

D07Drawer.propTypes = {
	anchor: PropTypes.string,
}

D07Drawer.displayName = "D07Drawer";
export default D07Drawer;