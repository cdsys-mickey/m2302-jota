import { D01Context } from "@/contexts/D01/D01Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const D01Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const d01 = useContext(D01Context);
	return (
		<SideDrawer anchor={anchor} open={d01.sideDrawerOpen} onClose={d01.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{d01.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{d01.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

D01Drawer.propTypes = {
	anchor: PropTypes.string,
}

D01Drawer.displayName = "D01Drawer";
export default D01Drawer;