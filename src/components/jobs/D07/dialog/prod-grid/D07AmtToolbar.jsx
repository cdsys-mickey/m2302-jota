import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { D07TaxAmtLabel } from "../bottom-toolbar/D07TaxAmtLabel";
import { D07TotAmtLabel } from "../bottom-toolbar/D07TotAmtLabel";
import { D07PaidAmtLabel } from "../bottom-toolbar/D07PaidAmtLabel";
import { D07PayAmtLabel } from "../bottom-toolbar/D07PayAmtLabel";

export const D07AmtToolbar = memo((props) => {
	const { ...rest } = props;

	return (
		<Grid container {...rest}>
			<Grid item xs={24} md={3}>
				<D07TaxAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D07TotAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D07PaidAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D07PayAmtLabel flex />
			</Grid>
		</Grid>
	);
});

D07AmtToolbar.propTypes = {};

D07AmtToolbar.displayName = "D07AmtToolbar";




