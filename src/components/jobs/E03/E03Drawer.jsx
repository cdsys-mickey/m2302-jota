import { E03Context } from "@/contexts/E03/E03Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const E03Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const e03 = useContext(E03Context);
	return (
		<SideDrawer anchor={anchor} open={e03.sideDrawerOpen} onClose={e03.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{e03.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{e03.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

E03Drawer.propTypes = {
	anchor: PropTypes.string,
}

E03Drawer.displayName = "E03Drawer";
export default E03Drawer;


