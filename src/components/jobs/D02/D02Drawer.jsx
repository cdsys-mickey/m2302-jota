import { D02Context } from "@/contexts/D02/D02Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const D02Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const d02 = useContext(D02Context);
	return (
		<SideDrawer anchor={anchor} open={d02.sideDrawerOpen} onClose={d02.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{d02.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{d02.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

D02Drawer.propTypes = {
	anchor: PropTypes.string,
}

D02Drawer.displayName = "D02Drawer";
export default D02Drawer;