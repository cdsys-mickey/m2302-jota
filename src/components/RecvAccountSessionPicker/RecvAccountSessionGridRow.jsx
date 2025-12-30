import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { RecvAcctYMColumn } from "./columns/RecvAcctYMColumn";
import { RecvAccountSessionColumn } from "./columns/RecvAccountSessionColumn";

export const RecvAccountSessionGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;
		return (
			<Grid ref={ref} container columns={24} spacing={1}>
				<RecvAcctYMColumn>{value["AccYM"]}</RecvAcctYMColumn>
				<RecvAccountSessionColumn>{value["Stage"]}</RecvAccountSessionColumn>
			</Grid>
		);
	})
);

RecvAccountSessionGridRow.propTypes = {
	value: PropTypes.object,
};

RecvAccountSessionGridRow.displayName = "RecvAccountSessionGridRow";
