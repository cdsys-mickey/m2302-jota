import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { DepOrderDateColumn } from "./columns/DepOrderDateColumn";
import { DepOrderDeptIdColumn } from "./columns/DepOrderDeptIdColumn";
import { DepOrderDeptNameColumn } from "./columns/DepOrderDeptNameColumn";
import { DepOrderFlagColumn } from "./columns/DepOrderFlagColumn";
import { DepOrderIdColumn } from "./columns/DepOrderIdColumn";
import { DepOrderUserColumn } from "./columns/DepOrderUserColumn";

const CustomerPurchaseOrderGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;

		return (
			<Grid ref={ref} container columns={24} spacing={2}>
				<DepOrderIdColumn>{value["訂貨單號"]}</DepOrderIdColumn>
				<DepOrderFlagColumn justifyContent="center">{value["結清"]}</DepOrderFlagColumn>
				<DepOrderDateColumn>{value["訂貨日期"]}</DepOrderDateColumn>
				<DepOrderUserColumn>{value["業務人員"]}</DepOrderUserColumn>
				<DepOrderFlagColumn justifyContent="center">{value["零售"]}</DepOrderFlagColumn>
				<DepOrderDeptIdColumn>{value["客戶代碼"]}</DepOrderDeptIdColumn>
				<DepOrderDeptNameColumn>{value["客戶簡稱"]}</DepOrderDeptNameColumn>
			</Grid>
		);
	})
);

CustomerPurchaseOrderGridRow.propTypes = {
	value: PropTypes.object,
};

CustomerPurchaseOrderGridRow.displayName = "DepOrderGridRow";
export default CustomerPurchaseOrderGridRow;