import { Box, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import { RstPOCheckerColumn } from "./columns/RstPOCheckerColumn";
import { RstPODateColumn } from "./columns/RstPODateColumn";
import { RstPOIdColumn } from "./columns/RstPOIdColumn";
import PropTypes from "prop-types";

export const RstPurchaseOrderGridHeader = memo(
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
					<RstPOIdColumn header>採購單號</RstPOIdColumn>
					<RstPODateColumn header>採購日期</RstPODateColumn>
					<RstPOCheckerColumn header>覆核</RstPOCheckerColumn>
				</Grid>
			</Box>
		);
	})
);

RstPurchaseOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

RstPurchaseOrderGridHeader.displayName = "PurchaseOrderGridHeader";
