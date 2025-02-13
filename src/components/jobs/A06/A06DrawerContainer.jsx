import { A06Context } from "@/contexts/A06/A06Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

const A06DrawerContainer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const a06 = useContext(A06Context);
	return (
		<SideDrawer anchor={anchor} open={a06.sideDrawerOpen} onClose={a06.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{a06.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{a06.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

A06DrawerContainer.propTypes = {
	anchor: PropTypes.string,
}

A06DrawerContainer.displayName = "A06Drawer";
export default A06DrawerContainer;