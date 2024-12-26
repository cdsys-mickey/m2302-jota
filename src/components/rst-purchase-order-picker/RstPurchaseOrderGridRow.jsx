import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { RstPOIdColumn } from "./columns/RstPOIdColumn";
import { RstPODateColumn } from "./columns/RstPODateColumn";
import { RstPOCheckerColumn } from "./columns/RstPOCheckerColumn";

export const RstPurchaseOrderGridRow = memo(
	forwardRef((props, ref) => {
		const { value } = props;
		return (
			<Grid ref={ref} container columns={24} spacing={2}>
				<RstPOIdColumn>{value["採購單號"]}</RstPOIdColumn>
				<RstPODateColumn>{value["採購日"]}</RstPODateColumn>
				<RstPOCheckerColumn>{value["覆核人員"]}</RstPOCheckerColumn>
			</Grid>
		);
	})
);

RstPurchaseOrderGridRow.propTypes = {
	value: PropTypes.object,
};

RstPurchaseOrderGridRow.displayName = "PurchaseOrderGridRow";
