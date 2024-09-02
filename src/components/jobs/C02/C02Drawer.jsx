import { C02Context } from "@/contexts/C02/C02Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const C02Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c02 = useContext(C02Context);
	return (
		<SideDrawer anchor={anchor} open={c02.sideDrawerOpen} onClose={c02.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{c02.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c02.itemData?.Writer_N}
			</FormFieldLabel>
			<FormFieldLabel label="覆核">
				{c02.itemData?.Checker_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

C02Drawer.propTypes = {
	anchor: PropTypes.string,
}

C02Drawer.displayName = "C02Drawer";
export default C02Drawer;