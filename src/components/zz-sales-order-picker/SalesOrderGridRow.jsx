import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import SOIdColumn from "./columns/SOIdColumn";
import SODateColumn from "./columns/SODateColumn";
import SOCheckerColumn from "./columns/SOCheckerColumn";

const SalesOrderGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;
		return (
			<Grid ref={ref} container columns={24} spacing={2}>
				<SOIdColumn>{value["採購單號"]}</SOIdColumn>
				<SODateColumn>{value["採購日"]}</SODateColumn>
				<SOCheckerColumn>{value["覆核人員"]}</SOCheckerColumn>
			</Grid>
		);
	})
);

SalesOrderGridRow.propTypes = {
	value: PropTypes.object,
};

SalesOrderGridRow.displayName = "SalesOrderGridRow";
export default SalesOrderGridRow;