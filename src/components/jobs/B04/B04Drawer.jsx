import { B04Context } from "@/contexts/B04/B04Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const B04Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const b04 = useContext(B04Context);
	return (
		<SideDrawer anchor={anchor} open={b04.sideDrawerOpen} onClose={b04.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{b04.itemData?.WriteDate}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{b04.itemData?.Writer}
			</FormFieldLabel>
		</SideDrawer>
	);
});

B04Drawer.propTypes = {
	anchor: PropTypes.string,
}

B04Drawer.displayName = "B04Drawer";
export default B04Drawer;


