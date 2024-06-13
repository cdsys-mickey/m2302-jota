import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { TxoOrderDateColumn } from "./columns/TxoOrderDateColumn";
import { TxoOrderDeptColumn } from "./columns/TxoOrderDeptColumn";
import { TxoOrderDeptIdColumn } from "./columns/TxoOrderDeptIdColumn";
import { TxoOrderIdColumn } from "./columns/TxoOrderIdColumn";

export const TxoOrderGridHeader = memo(
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
					<TxoOrderIdColumn header>撥出單號</TxoOrderIdColumn>
					<TxoOrderDateColumn header>撥出日期</TxoOrderDateColumn>
					<TxoOrderIdColumn header>撥入單號</TxoOrderIdColumn>
					<TxoOrderIdColumn header>訂貨單號</TxoOrderIdColumn>
					<TxoOrderDeptIdColumn header>撥入門市</TxoOrderDeptIdColumn>
					<TxoOrderDeptColumn header>撥出門市</TxoOrderDeptColumn>
				</Grid>
			</Box>
		);
	})
);

TxoOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

TxoOrderGridHeader.displayName = "TxoOrderGridHeader";
