import { Box, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import { POCheckerColumn } from "./columns/POCheckerColumn";
import { PODateColumn } from "./columns/PODateColumn";
import { POIdColumn } from "./columns/POIdColumn";
import PropTypes from "prop-types";

export const PurchaseOrderGridHeader = memo(
	forwardRef((props, ref) => {
		const { sx = [], ...rest } = props;
		return (
			<Box
				ref={ref}
				// px={2}
				sx={[
					(theme) => ({
						borderBottom: "1px solid rgb(0,0,0,0.1)",
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				<Grid container columns={24} spacing={2}>
					<POIdColumn header>採購單號</POIdColumn>
					<PODateColumn header>採購日期</PODateColumn>
					<POCheckerColumn header>覆核</POCheckerColumn>
				</Grid>
			</Box>
		);
	})
);

PurchaseOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

PurchaseOrderGridHeader.displayName = "PurchaseOrderGridHeader";
