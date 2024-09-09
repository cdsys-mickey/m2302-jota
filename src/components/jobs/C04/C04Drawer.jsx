import { C04Context } from "@/contexts/C04/C04Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const C04Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c04 = useContext(C04Context);
	return (
		<SideDrawer anchor={anchor} open={c04.sideDrawerOpen} onClose={c04.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{c04.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c04.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

C04Drawer.propTypes = {
	anchor: PropTypes.string,
}

C04Drawer.displayName = "C04Drawer";
export default C04Drawer;