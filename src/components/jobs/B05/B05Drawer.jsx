import { B05Context } from "@/contexts/B05/B05Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const B05Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const b05 = useContext(B05Context);
	return (
		<SideDrawer anchor={anchor} open={b05.sideDrawerOpen} onClose={b05.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{b05.itemData?.WriteDate}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{b05.itemData?.Writer}
			</FormFieldLabel>
		</SideDrawer>
	);
});

B05Drawer.propTypes = {
	anchor: PropTypes.string,
}

B05Drawer.displayName = "B05Drawer";
export default B05Drawer;