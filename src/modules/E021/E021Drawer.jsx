import { E021Context } from "@/modules/E021/E021Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const E021Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const e021 = useContext(E021Context);
	return (
		<SideDrawer anchor={anchor} open={e021.sideDrawerOpen} onClose={e021.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{e021.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{e021.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

E021Drawer.propTypes = {
	anchor: PropTypes.string,
}

E021Drawer.displayName = "E021Drawer";
export default E021Drawer;


