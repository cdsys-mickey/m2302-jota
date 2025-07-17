import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { CmsBookingOrderDateColumn } from "./columns/CmsBookingOrderDateColumn";
import { CmsBookingOrderDeptColumn } from "./columns/CmsBookingOrderDeptColumn";
import { CmsBookingOrderIdColumn } from "./columns/CmsBookingOrderIdColumn";

const CmsBookingOrderGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;

		return (
			<Grid ref={ref} container columns={24} spacing={2}>
				<CmsBookingOrderIdColumn>{value["OrdID"]}</CmsBookingOrderIdColumn>
				<CmsBookingOrderDateColumn>{value["OrdDate"]}</CmsBookingOrderDateColumn>
				<CmsBookingOrderDateColumn>{value["ArrDate"]}</CmsBookingOrderDateColumn>
				<CmsBookingOrderDeptColumn>{value["GrpName"]}</CmsBookingOrderDeptColumn>
				<CmsBookingOrderDeptColumn>{value["CarData"]}</CmsBookingOrderDeptColumn>
				<CmsBookingOrderDeptColumn>{value["TrvData"]}</CmsBookingOrderDeptColumn>
			</Grid>
		);
	})
);

CmsBookingOrderGridRow.propTypes = {
	value: PropTypes.object,
};

CmsBookingOrderGridRow.displayName = "DepOrderGridRow";
export default CmsBookingOrderGridRow;