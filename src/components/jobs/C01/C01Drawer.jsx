import { C01Context } from "@/contexts/C01/C01Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const C01Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c01 = useContext(C01Context);
	return (
		<SideDrawer anchor={anchor} open={c01.sideDrawerOpen} onClose={c01.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{c01.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c01.itemData?.Writer_N}
			</FormFieldLabel>
			<FormFieldLabel label="覆核">
				{c01.itemData?.Checker_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

C01Drawer.propTypes = {
	anchor: PropTypes.string,
}

C01Drawer.displayName = "C01Drawer";
export default C01Drawer;