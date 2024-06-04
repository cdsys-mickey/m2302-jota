import { Box, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import { DepOrderCheckerColumn } from "./columns/DepOrderCheckerColumn";
import { DepOrderDateColumn } from "./columns/DepOrderDateColumn";
import { DepOrderIdColumn } from "./columns/DepOrderIdColumn";
import PropTypes from "prop-types";
import { DepOrderFlagColumn } from "./columns/DepOrderFlagColumn";
import { DepOrderUserColumn } from "./columns/DepOrderUserColumn";
import { DepOrderDeptIdColumn } from "./columns/DepOrderDeptIdColumn";
import { DepOrderDeptNameColumn } from "./columns/DepOrderDeptNameColumn";
import { DepOrderDeptColumn } from "./columns/DepOrderDeptColumn";

export const DepOrderGridHeader = memo(
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

DepOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

DepOrderGridHeader.displayName = "DepOrderGridHeader";
