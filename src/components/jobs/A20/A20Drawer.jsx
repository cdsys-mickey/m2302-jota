import { A20Context } from "@/contexts/A20/A20Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const A20Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const a20 = useContext(A20Context);
	return (
		<SideDrawer anchor={anchor} open={a20.sideDrawerOpen} onClose={a20.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{a20.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{a20.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

A20Drawer.propTypes = {
	anchor: PropTypes.string,
}

A20Drawer.displayName = "A20Drawer";
export default A20Drawer;