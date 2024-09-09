import { C05Context } from "@/contexts/C05/C05Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const C05Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c05 = useContext(C05Context);
	return (
		<SideDrawer anchor={anchor} open={c05.sideDrawerOpen} onClose={c05.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{c05.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c05.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

C05Drawer.propTypes = {
	anchor: PropTypes.string,
}

C05Drawer.displayName = "C05Drawer";
export default C05Drawer;