import { C08Context } from "@/contexts/C08/C08Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const C08Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c08 = useContext(C08Context);
	return (
		<SideDrawer anchor={anchor} open={c08.sideDrawerOpen} onClose={c08.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{c08.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c08.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

C08Drawer.propTypes = {
	anchor: PropTypes.string,
}

C08Drawer.displayName = "C08Drawer";
export default C08Drawer;