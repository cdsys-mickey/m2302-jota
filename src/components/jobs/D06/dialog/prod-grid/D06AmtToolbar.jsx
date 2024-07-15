import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { D06TaxAmtLabel } from "../bottom-toolbar/D06TaxAmtLabel";
import { D06TotAmtLabel } from "../bottom-toolbar/D06TotAmtLabel";
import { D06PaidAmtLabel } from "../bottom-toolbar/D06PaidAmtLabel";
import { D06PayAmtLabel } from "../bottom-toolbar/D06PayAmtLabel";

export const D06AmtToolbar = memo((props) => {
	const { ...rest } = props;

	return (
		<Grid container {...rest}>
			<Grid item xs={24} md={3}>
				<D06TaxAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D06TotAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D06PaidAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D06PayAmtLabel flex />
			</Grid>
		</Grid>
	);
});

D06AmtToolbar.propTypes = {};

D06AmtToolbar.displayName = "D06AmtToolbar";



