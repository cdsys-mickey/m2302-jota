import { A01Context } from "@/contexts/A01/A01Context";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import SideDrawer from "@/shared-components/side-drawer/SideDrawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import { useMemo } from "react";
import Forms from "@/shared-modules/Forms.mjs";

const A01Drawer = memo((props) => {
	const { anchor = "right", ...rest } = props;
	const a01 = useContext(A01Context);

	const modifiedAt = useMemo(() => {
		const counterDate = Forms.parseDate(a01.itemData?.WriteDate_N);
		const date = Forms.parseDate(a01.itemData?.WriteDate_StoreCase);
		const ts = Math.max(counterDate, date);
		return ts ? Forms.formatDateTime(new Date(ts)) : "";
	}, [a01.itemData?.WriteDate_N, a01.itemData?.WriteDate_StoreCase])

	return (
		<SideDrawer anchor={anchor} open={a01.sideDrawerOpen} onClose={a01.handleSideDrawerClose}
			slotProps={{
				backdrop: {
					sx: [MuiStyles.BACKDROP_TRANSPARENT]
				}
			}}
			{...rest} >
			<FormFieldLabel label="最後修改時間">
				{modifiedAt}
			</FormFieldLabel>
			<FormFieldLabel label="修改人員">
				{a01.itemData?.Writer_N}
			</FormFieldLabel>
		</SideDrawer>
	);
});

A01Drawer.propTypes = {
	anchor: PropTypes.string,
}

A01Drawer.displayName = "A01Drawer";
export default A01Drawer;