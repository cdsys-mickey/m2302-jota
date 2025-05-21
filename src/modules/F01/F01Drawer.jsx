import { F01Context } from "@/modules/F01/F01Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const F01Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const f01 = useContext(F01Context);
	return (
		<SideDrawer anchor={anchor} open={f01.sideDrawerOpen} onClose={f01.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{f01.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{f01.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

F01Drawer.propTypes = {
	anchor: PropTypes.string,
}

F01Drawer.displayName = "F01Drawer";
export default F01Drawer;
