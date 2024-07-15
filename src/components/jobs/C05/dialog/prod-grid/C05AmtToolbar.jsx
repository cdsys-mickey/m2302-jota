import { Grid } from "@mui/material";
import { memo } from "react";
import { C05RtnAmtLabel } from "../bottom-toolbar/C05RtnAmtLabel";
import { C05TaxAmtLabel } from "../bottom-toolbar/C05TaxAmtLabel";
import { C05TotAmtLabel } from "../bottom-toolbar/C05TotAmtLabel";
import { C05RecvAmtLabel } from "../bottom-toolbar/C05RecvAmtLabel";

export const C05AmtToolbar = memo((props) => {
	const { ...rest } = props;

	return (
		<Grid container {...rest}>
			<Grid item xs={24} md={3}>
				<C05TaxAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<C05TotAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<C05RecvAmtLabel flex />
			</Grid>
			<Grid item xs={24} md={3}>
				<C05RtnAmtLabel flex />
			</Grid>
		</Grid>
	);
});

C05AmtToolbar.propTypes = {};

C05AmtToolbar.displayName = "C05AmtToolbar";
