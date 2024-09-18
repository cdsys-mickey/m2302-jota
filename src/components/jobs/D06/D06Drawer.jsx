import { D06Context } from "@/contexts/D06/D06Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const D06Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const d06 = useContext(D06Context);
	return (
		<SideDrawer anchor={anchor} open={d06.sideDrawerOpen} onClose={d06.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}

			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{d06.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{d06.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

D06Drawer.propTypes = {
	anchor: PropTypes.string,
}

D06Drawer.displayName = "D06Drawer";
export default D06Drawer;