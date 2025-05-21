import { C03Context } from "@/contexts/C03/C03Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const C03Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c03 = useContext(C03Context);
	return (
		<SideDrawer anchor={anchor} open={c03.sideDrawerOpen} onClose={c03.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{c03.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c03.itemData?.Writer_N}
			</FormFieldLabel>
			<FormFieldLabel label="進貨單">
				{c03.itemData?.GinID_N}
			</FormFieldLabel>
			<FormFieldLabel label="請購單">
				{c03.itemData?.RqtID_N}
			</FormFieldLabel>
			<FormFieldLabel label="覆核">
				{c03.itemData?.Checker_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

C03Drawer.propTypes = {
	anchor: PropTypes.string,
}

C03Drawer.displayName = "C03Drawer";
export default C03Drawer;