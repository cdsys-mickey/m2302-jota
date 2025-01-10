import { A16Context } from "@/contexts/A16/A16Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const A16Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const a16 = useContext(A16Context);
	return (
		<SideDrawer anchor={anchor} open={a16.sideDrawerOpen} onClose={a16.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{a16.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{a16.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

A16Drawer.propTypes = {
	anchor: PropTypes.string,
}

A16Drawer.displayName = "A16Drawer";
export default A16Drawer;
