import { C09Context } from "@/contexts/C09/C09Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const C09Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c09 = useContext(C09Context);
	return (
		<SideDrawer anchor={anchor} open={c09.sideDrawerOpen} onClose={c09.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{c09.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c09.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

C09Drawer.propTypes = {
	anchor: PropTypes.string,
}

C09Drawer.displayName = "C09Drawer";
export default C09Drawer;