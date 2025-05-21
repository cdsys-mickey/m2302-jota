import { B012Context } from "@/contexts/B012/B012Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

const B012Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	return (
		<SideDrawer anchor={anchor} open={b012.sideDrawerOpen} onClose={b012.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{b012.itemData?.WriteDate}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{b012.itemData?.Writer}
			</FormFieldLabel>
		</SideDrawer>
	);
});

B012Drawer.propTypes = {
	anchor: PropTypes.string,
}

B012Drawer.displayName = "B012Drawer";
export default B012Drawer;

