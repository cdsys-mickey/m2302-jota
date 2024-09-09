import { A01Context } from "@/contexts/A01/A01Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const A01Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const a01 = useContext(A01Context);
	return (
		<SideDrawer anchor={anchor} open={a01.sideDrawerOpen} onClose={a01.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{a01.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{a01.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

A01Drawer.propTypes = {
	anchor: PropTypes.string,
}

A01Drawer.displayName = "A01Drawer";
export default A01Drawer;