import { C06Context } from "@/contexts/C06/C06Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const C06Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c06 = useContext(C06Context);
	return (
		<SideDrawer anchor={anchor} open={c06.sideDrawerOpen} onClose={c06.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{c06.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c06.itemData?.Writer_N}
			</FormFieldLabel>
			<FormFieldLabel label="來源撥出單號">
				{c06.itemData?.TxoID}
			</FormFieldLabel>
		</SideDrawer>
	);
});

C06Drawer.propTypes = {
	anchor: PropTypes.string,
}

C06Drawer.displayName = "C06Drawer";
export default C06Drawer;