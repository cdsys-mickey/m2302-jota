import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { F03TaxAmtLabel } from "../bottom-toolbar/F03TaxAmtLabel";
import { F03TotAmtLabel } from "../bottom-toolbar/F03TotAmtLabel";
import { F03PaidAmtLabel } from "../bottom-toolbar/F03PaidAmtLabel";
import { F03PayAmtLabel } from "../bottom-toolbar/F03PayAmtLabel";

export const F03AmtToolbar = memo((props) => {
	const { ...rest } = props;

	return (
		<Grid container {...rest}>
			<Grid item xs={24} md={3}>
				<F03TaxAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<F03TotAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<F03PaidAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<F03PayAmtLabel flex />
			</Grid>
		</Grid>
	);
});

F03AmtToolbar.propTypes = {};

F03AmtToolbar.displayName = "F03AmtToolbar";





