import { B032Context } from "@/contexts/B032/B032Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";

const B032Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const b = useContext(BContext);
	const b032 = useContext(b.forNew ? B032Context : B012Context);
	return (
		<SideDrawer anchor={anchor} open={b032.sideDrawerOpen} onClose={b032.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{b032.itemData?.WriteDate}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{b032.itemData?.Writer}
			</FormFieldLabel>
		</SideDrawer>
	);
});

B032Drawer.propTypes = {
	anchor: PropTypes.string,
}

B032Drawer.displayName = "B032Drawer";
export default B032Drawer;


