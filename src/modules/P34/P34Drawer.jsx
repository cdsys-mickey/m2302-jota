import { P34Context } from "@/modules/P34/P34Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const P34Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const p34 = useContext(P34Context);
	return (
		<SideDrawer anchor={anchor} open={p34.sideDrawerOpen} onClose={p34.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{p34.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{p34.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

P34Drawer.propTypes = {
	anchor: PropTypes.string,
}

P34Drawer.displayName = "P34Drawer";
export default P34Drawer;
