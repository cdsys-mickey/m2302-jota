import { P36Context } from "@/modules/P36/P36Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const P36Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const p36 = useContext(P36Context);
	return (
		<SideDrawer anchor={anchor} open={p36.sideDrawerOpen} onClose={p36.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{p36.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{p36.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

P36Drawer.propTypes = {
	anchor: PropTypes.string,
}

P36Drawer.displayName = "P36Drawer";
export default P36Drawer;


