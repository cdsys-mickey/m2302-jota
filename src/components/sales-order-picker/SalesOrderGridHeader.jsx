import { Box, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import SOIdColumn from "./columns/SOIdColumn";
import SODateColumn from "./columns/SODateColumn";
import SOCheckerColumn from "./columns/SOCheckerColumn";

const SalesOrderGridHeader = memo(
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
					<SOIdColumn header>採購單號</SOIdColumn>
					<SODateColumn header>採購日期</SODateColumn>
					<SOCheckerColumn header>覆核</SOCheckerColumn>
				</Grid>
			</Box>
		);
	})
);

SalesOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

SalesOrderGridHeader.displayName = "SalesOrderGridHeader";
export default SalesOrderGridHeader;