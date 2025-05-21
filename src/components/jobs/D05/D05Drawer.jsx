import { D05Context } from "@/contexts/D05/D05Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const D05Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const d05 = useContext(D05Context);
	return (
		<SideDrawer anchor={anchor} open={d05.sideDrawerOpen} onClose={d05.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{d05.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{d05.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

D05Drawer.propTypes = {
	anchor: PropTypes.string,
}

D05Drawer.displayName = "D05Drawer";
export default D05Drawer;