import { E01Context } from "@/contexts/E01/E01Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const E01Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const e01 = useContext(E01Context);
	return (
		<SideDrawer anchor={anchor} open={e01.sideDrawerOpen} onClose={e01.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{e01.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{e01.itemData?.Writer_N}
			</FormFieldLabel>
			<FormFieldLabel label="銷貨單號">
				{e01.itemData?.SalIDs}
			</FormFieldLabel>
		</SideDrawer>
	);
});

E01Drawer.propTypes = {
	anchor: PropTypes.string,
}

E01Drawer.displayName = "E01Drawer";
export default E01Drawer;

