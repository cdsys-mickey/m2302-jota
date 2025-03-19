import { F03Context } from "@/contexts/F03/F03Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const F03Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const f03 = useContext(F03Context);
	return (
		<SideDrawer anchor={anchor} open={f03.sideDrawerOpen} onClose={f03.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{f03.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{f03.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

F03Drawer.propTypes = {
	anchor: PropTypes.string,
}

F03Drawer.displayName = "F03Drawer";
export default F03Drawer;
