import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { D02TaxAmtLabel } from "../bottom-toolbar/D02TaxAmtLabel";
import { D02TotAmtLabel } from "../bottom-toolbar/D02TotAmtLabel";
import { D02PaidAmtLabel } from "../bottom-toolbar/D02PaidAmtLabel";
import { D02PayAmtLabel } from "../bottom-toolbar/D02PayAmtLabel";

export const D02AmtToolbar = memo((props) => {
	const { ...rest } = props;

	return (
		<Grid container {...rest}>
			<Grid item xs={24} md={3}>
				<D02TaxAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D02TotAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D02PaidAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<D02PayAmtLabel flex />
			</Grid>
		</Grid>
	);
});

D02AmtToolbar.propTypes = {};

D02AmtToolbar.displayName = "D02AmtToolbar";


