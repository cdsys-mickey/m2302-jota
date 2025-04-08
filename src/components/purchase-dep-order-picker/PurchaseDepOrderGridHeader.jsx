import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { DepOrderDateColumn } from "./columns/DepOrderDateColumn";
import { DepOrderDeptColumn } from "./columns/DepOrderDeptColumn";
import { DepOrderDeptIdColumn } from "./columns/DepOrderDeptIdColumn";
import { DepOrderFlagColumn } from "./columns/DepOrderFlagColumn";
import { DepOrderIdColumn } from "./columns/DepOrderIdColumn";
import { DepOrderUserColumn } from "./columns/DepOrderUserColumn";
import { blue, cyan } from "@mui/material/colors";

const PurchaseDepOrderGridHeader = memo(
	forwardRef((props, ref) => {
		const { sx = [], ...rest } = props;
		return (
			<Box
				ref={ref}
				sx={[
					(theme) => ({
						borderBottom: "1px solid rgb(0,0,0,0.1)",
						backgroundColor: cyan[100],

					}),
					...(Array.isArray(sx) ? sx : [sx]),

				]}
				{...rest}>
				<Grid container columns={24} spacing={0}>
					<DepOrderFlagColumn header>結</DepOrderFlagColumn>
					<DepOrderIdColumn header>訂貨單號</DepOrderIdColumn>
					<DepOrderDateColumn header>訂貨日期</DepOrderDateColumn>
					<DepOrderDateColumn header>預到日期</DepOrderDateColumn>
					<DepOrderUserColumn header>製單人員</DepOrderUserColumn>
					<DepOrderDeptIdColumn header>出貨門市</DepOrderDeptIdColumn>
					<DepOrderDeptColumn header>訂貨門市</DepOrderDeptColumn>
				</Grid>
			</Box>
		);
	})
);

PurchaseDepOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

PurchaseDepOrderGridHeader.displayName = "PurchaseDepOrderGridHeader";
export default PurchaseDepOrderGridHeader;