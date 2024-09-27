import { DSGToolbarLabel } from "@/shared-components/dsg/DSGToolbarLabel";
import { Box } from "@mui/system";
import { memo } from "react";

const E01ProdGridToolbarLabels = memo(() => {
	return (
		<Box sx={[
			(theme) => ({
				"& > *": {
					marginLeft: theme.spacing(3)
				}
			})
		]}>
			<DSGToolbarLabel label="外加稅額" name="TaxAmt" />
			<DSGToolbarLabel label="訂貨合計" name="SalAmt" />
			<DSGToolbarLabel label="總計金額" name="TotAmt" />

		</Box>
	);
});
E01ProdGridToolbarLabels.displayName = "E01ProdGridToolbarLabels";
export default E01ProdGridToolbarLabels;