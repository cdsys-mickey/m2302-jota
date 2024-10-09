import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { DepOrderDateColumn } from "./columns/DepOrderDateColumn";
import { DepOrderDeptColumn } from "./columns/DepOrderDeptColumn";
import { DepOrderDeptIdColumn } from "./columns/DepOrderDeptIdColumn";
import { DepOrderFlagColumn } from "./columns/DepOrderFlagColumn";
import { DepOrderIdColumn } from "./columns/DepOrderIdColumn";
import { DepOrderUserColumn } from "./columns/DepOrderUserColumn";
import { DepOrderDeptNameColumn } from "./columns/DepOrderDeptNameColumn";

const CustomerPurchaseOrderGridHeader = memo(
	forwardRef((props, ref) => {
		const { sx = [], ...rest } = props;
		return (
			<Box
				ref={ref}
				sx={[
					(theme) => ({
						borderBottom: "1px solid rgb(0,0,0,0.1)",
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				<Grid container columns={24} spacing={0}>
					<DepOrderIdColumn header>訂貨單號</DepOrderIdColumn>
					<DepOrderFlagColumn header justifyContent="center">結</DepOrderFlagColumn>
					<DepOrderDateColumn header>訂貨日期</DepOrderDateColumn>
					<DepOrderUserColumn header>業務員</DepOrderUserColumn>
					<DepOrderFlagColumn header justifyContent="center">零售</DepOrderFlagColumn>
					<DepOrderDeptIdColumn header>客戶代碼</DepOrderDeptIdColumn>
					<DepOrderDeptNameColumn header>客戶名稱</DepOrderDeptNameColumn>
				</Grid>
			</Box>
		);
	})
);

CustomerPurchaseOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CustomerPurchaseOrderGridHeader.displayName = "PurchaseDepOrderGridHeader";
export default CustomerPurchaseOrderGridHeader;