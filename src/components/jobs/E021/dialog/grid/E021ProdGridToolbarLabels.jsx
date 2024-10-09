import { DSGToolbarLabel } from "@/shared-components/dsg/DSGToolbarLabel";
import { Box } from "@mui/system";
import { memo } from "react";

const E021ProdGridToolbarLabels = memo(() => {
	return (
		<Box sx={[
			(theme) => ({
				"& > *": {
					marginLeft: theme.spacing(3)
				}
			})
		]}>
			<DSGToolbarLabel label="銷貨" name="SalAmt" />
			<DSGToolbarLabel label="稅額" name="TaxAmt" />
			<DSGToolbarLabel label="總計" name="TotAmt" />
			<DSGToolbarLabel label="已收" name="RecdAmt" />
			<DSGToolbarLabel label="應收金額" name="ArecAmt" />

		</Box>
	);
});
E021ProdGridToolbarLabels.displayName = "E021ProdGridToolbarLabels";
export default E021ProdGridToolbarLabels;
