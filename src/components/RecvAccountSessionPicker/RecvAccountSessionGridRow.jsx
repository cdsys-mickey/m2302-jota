import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { G05YMColumn } from "./columns/G05YMColumn";
import { RecvAccountSessionColumn } from "./columns/RecvAccountSessionColumn";

export const RecvAccountSessionGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;
		return (
			<Grid ref={ref} container columns={24} spacing={2}>
				<G05YMColumn>{value["CurAccYM"]}</G05YMColumn>
				<RecvAccountSessionColumn>{value["CurStage"]}</RecvAccountSessionColumn>
			</Grid>
		);
	})
);

RecvAccountSessionGridRow.propTypes = {
	value: PropTypes.object,
};

RecvAccountSessionGridRow.displayName = "RecvAccountSessionGridRow";
