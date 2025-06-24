import { P35Context } from "@/modules/P35/P35Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const P35Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const p35 = useContext(P35Context);
	return (
		<SideDrawer anchor={anchor} open={p35.sideDrawerOpen} onClose={p35.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{p35.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{p35.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

P35Drawer.propTypes = {
	anchor: PropTypes.string,
}

P35Drawer.displayName = "P35Drawer";
export default P35Drawer;

