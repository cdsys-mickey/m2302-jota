import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { D01TaxAmtLabel } from "../bottom-toolbar/D01TaxAmtLabel";
import { D01TotAmtLabel } from "../bottom-toolbar/D01TotAmtLabel";
import { D01PaidAmtLabel } from "../bottom-toolbar/D01PaidAmtLabel";
import { D01PayAmtLabel } from "../bottom-toolbar/D01PayAmtLabel";

export const D01AmtToolbar = memo((props) => {
	const { ...rest } = props;

	return (
		<Grid container {...rest}>
			<Grid item xs={24} md={3}>
				<D01TaxAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D01TotAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D01PaidAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D01PayAmtLabel flex />
			</Grid>
		</Grid>
	);
});

D01AmtToolbar.propTypes = {};

D01AmtToolbar.displayName = "D01AmtToolbar";

