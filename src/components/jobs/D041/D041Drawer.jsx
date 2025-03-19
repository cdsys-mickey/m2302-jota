import { D041Context } from "@/contexts/D041/D041Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const D041Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const d041 = useContext(D041Context);
	return (
		<SideDrawer anchor={anchor} open={d041.sideDrawerOpen} onClose={d041.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{d041.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{d041.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

D041Drawer.propTypes = {
	anchor: PropTypes.string,
}

D041Drawer.displayName = "D041Drawer";
export default D041Drawer;