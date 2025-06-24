import { P21Context } from "@/modules/P21/P21Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const P21Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const p21 = useContext(P21Context);
	return (
		<SideDrawer anchor={anchor} open={p21.sideDrawerOpen} onClose={p21.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{p21.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{p21.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

P21Drawer.propTypes = {
	anchor: PropTypes.string,
}

P21Drawer.displayName = "P21Drawer";
export default P21Drawer;

