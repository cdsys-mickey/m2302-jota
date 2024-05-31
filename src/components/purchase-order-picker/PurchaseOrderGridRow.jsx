import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { POIdColumn } from "./columns/POIdColumn";
import { PODateColumn } from "./columns/PODateColumn";
import { POCheckerColumn } from "./columns/POCheckerColumn";

export const PurchaseOrderGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;
		return (
			<Grid ref={ref} container columns={24} spacing={2}>
				<POIdColumn>{value["採購單號"]}</POIdColumn>
				<PODateColumn>{value["採購日"]}</PODateColumn>
				<POCheckerColumn>{value["覆核人員"]}</POCheckerColumn>
			</Grid>
		);
	})
);

PurchaseOrderGridRow.propTypes = {
	value: PropTypes.object,
};

PurchaseOrderGridRow.displayName = "PurchaseOrderGridRow";
