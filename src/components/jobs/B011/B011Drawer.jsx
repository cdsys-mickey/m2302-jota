import { B011Context } from "@/contexts/B011/B011Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const B011Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const b011 = useContext(B011Context);
	return (
		<SideDrawer anchor={anchor} open={b011.sideDrawerOpen} onClose={b011.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{b011.itemData?.WriteDate}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{b011.itemData?.Writer}
			</FormFieldLabel>
		</SideDrawer>
	);
});

B011Drawer.propTypes = {
	anchor: PropTypes.string,
}

B011Drawer.displayName = "B011Drawer";
export default B011Drawer;