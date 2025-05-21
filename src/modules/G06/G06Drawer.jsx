import { G06Context } from "@/modules/G06/G06Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const G06Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const g06 = useContext(G06Context);
	return (
		<SideDrawer anchor={anchor} open={g06.sideDrawerOpen} onClose={g06.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{g06.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{g06.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

G06Drawer.propTypes = {
	anchor: PropTypes.string,
}

G06Drawer.displayName = "G06Drawer";
export default G06Drawer;
