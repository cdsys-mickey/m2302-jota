import { B02Context } from "@/contexts/B02/B02Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import { BContext } from "@/contexts/B/BContext";
import { B04Context } from "@/contexts/B04/B04Context";

const B02Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
	return (
		<SideDrawer anchor={anchor} open={b02.sideDrawerOpen} onClose={b02.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{b02.itemData?.WriteDate}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{b02.itemData?.Writer}
			</FormFieldLabel>
		</SideDrawer>
	);
});

B02Drawer.propTypes = {
	anchor: PropTypes.string,
}

B02Drawer.displayName = "B02Drawer";
export default B02Drawer;

