import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { C04TaxAmtLabel } from "../bottom-toolbar/C04TaxAmtLabel";
import { C04TotAmtLabel } from "../bottom-toolbar/C04TotAmtLabel";
import { C04PaidAmtLabel } from "../bottom-toolbar/C04PaidAmtLabel";
import { C04PayAmtLabel } from "../bottom-toolbar/C04PayAmtLabel";

export const C04AmtToolbar = memo((props) => {
	const { ...rest } = props;

	return (
		<Grid container {...rest}>
			<Grid item xs={24} md={3}>
				<C04TaxAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<C04TotAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<C04PaidAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<C04PayAmtLabel flex />
			</Grid>
		</Grid>
	);
});

C04AmtToolbar.propTypes = {};

C04AmtToolbar.displayName = "C04AmtToolbar";
