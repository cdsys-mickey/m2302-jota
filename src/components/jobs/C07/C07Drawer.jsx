import { C07Context } from "@/contexts/C07/C07Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const C07Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const c07 = useContext(C07Context);
	return (
		<SideDrawer anchor={anchor} open={c07.sideDrawerOpen} onClose={c07.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{c07.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{c07.itemData?.Writer_N}
			</FormFieldLabel>
			<FormFieldLabel label="來源撥出單號">
				{c07.itemData?.TxoID}
			</FormFieldLabel>
		</SideDrawer >
	);
});

C07Drawer.propTypes = {
	anchor: PropTypes.string,
}

C07Drawer.displayName = "C07Drawer";
export default C07Drawer;