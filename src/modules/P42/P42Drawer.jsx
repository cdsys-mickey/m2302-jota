import { P42Context } from "@/modules/P42/P42Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const P42Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const p42 = useContext(P42Context);
	return (
		<SideDrawer anchor={anchor} open={p42.sideDrawerOpen} onClose={p42.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{p42.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{p42.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

P42Drawer.propTypes = {
	anchor: PropTypes.string,
}

P42Drawer.displayName = "P42Drawer";
export default P42Drawer;


