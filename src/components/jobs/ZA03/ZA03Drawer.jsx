import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const ZA03Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const za03 = useContext(ZA03Context);
	return (
		<SideDrawer anchor={anchor} open={za03.sideDrawerOpen} onClose={za03.handleSideDrawerClose} {...rest} >
			<FormFieldLabel label="最後修改時間">
				{za03.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{za03.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

ZA03Drawer.propTypes = {
	anchor: PropTypes.string,
}

ZA03Drawer.displayName = "ZA03Drawer";
export default ZA03Drawer;