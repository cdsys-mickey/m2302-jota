import { G08Context } from "@/modules/G08/G08Context";
import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";

const G08Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const g08 = useContext(G08Context);
	return (
		<SideDrawer anchor={anchor} open={g08.sideDrawerOpen} onClose={g08.handleSideDrawerClose} {...rest} >
			{g08.itemData?.AccYM_N && (
				<FormFieldLabel label="應收帳款">
					{`${g08.itemData?.AccYM_N}#${g08.itemData?.Stage_N}`}
				</FormFieldLabel>
			)}

			<FormFieldLabel label="最後修改時間">
				{g08.itemData?.WriteDate_N}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{g08.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

G08Drawer.propTypes = {
	anchor: PropTypes.string,
}

G08Drawer.displayName = "G08Drawer";
export default G08Drawer;

