import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { D041TaxAmtLabel } from "../bottom-toolbar/D041TaxAmtLabel";
import { D041TotAmtLabel } from "../bottom-toolbar/D041TotAmtLabel";
import { D041PaidAmtLabel } from "../bottom-toolbar/D041PaidAmtLabel";
import { D041PayAmtLabel } from "../bottom-toolbar/D041PayAmtLabel";

export const D041AmtToolbar = memo((props) => {
	const { ...rest } = props;

	return (
		<Grid container {...rest}>
			<Grid item xs={24} md={3}>
				<D041TaxAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D041TotAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D041PaidAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D041PayAmtLabel flex />
			</Grid>
		</Grid>
	);
});

D041AmtToolbar.propTypes = {};

D041AmtToolbar.displayName = "D041AmtToolbar";



