import { B031Context } from "@/contexts/B031/B031Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const B031Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const b031 = useContext(B031Context);
	return (
		<SideDrawer anchor={anchor} open={b031.sideDrawerOpen} onClose={b031.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{b031.itemData?.WriteDate}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{b031.itemData?.Writer}
			</FormFieldLabel>
		</SideDrawer>
	);
});

B031Drawer.propTypes = {
	anchor: PropTypes.string,
}

B031Drawer.displayName = "B031Drawer";
export default B031Drawer;

