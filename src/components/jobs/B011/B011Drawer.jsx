import { B011Context } from "@/contexts/B011/B011Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";
import { B031Context } from "@/contexts/B031/B031Context";
import { BContext } from "@/contexts/B/BContext";

const B011Drawer = memo((props) => {
	const { forNew = false, anchor = "right", ...rest } = props;
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);
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
	forNew: PropTypes.bool
}

B011Drawer.displayName = "B011Drawer";
export default B011Drawer;
