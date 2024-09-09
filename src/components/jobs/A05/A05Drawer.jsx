import { A05Context } from "@/contexts/A05/A05Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const A05Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const a05 = useContext(A05Context);
	return (
		<SideDrawer anchor={anchor} open={a05.sideDrawerOpen} onClose={a05.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{a05.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{a05.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

A05Drawer.propTypes = {
	anchor: PropTypes.string,
}

A05Drawer.displayName = "A05Drawer";
export default A05Drawer;