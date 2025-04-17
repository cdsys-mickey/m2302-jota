import { G02Context } from "@/modules/G02/G02Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/MuiStyles";

const G02Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const g02 = useContext(G02Context);
	return (
		<SideDrawer anchor={anchor} open={g02.sideDrawerOpen} onClose={g02.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{g02.itemData?.WriteDate}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{g02.itemData?.Writer}
			</FormFieldLabel>
		</SideDrawer>
	);
});

G02Drawer.propTypes = {
	anchor: PropTypes.string,
}

G02Drawer.displayName = "G02Drawer";
export default G02Drawer;
