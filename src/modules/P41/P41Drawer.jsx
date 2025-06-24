import { P41Context } from "@/modules/P41/P41Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const P41Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const p41 = useContext(P41Context);
	return (
		<SideDrawer anchor={anchor} open={p41.sideDrawerOpen} onClose={p41.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{p41.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{p41.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

P41Drawer.propTypes = {
	anchor: PropTypes.string,
}

P41Drawer.displayName = "P41Drawer";
export default P41Drawer;


