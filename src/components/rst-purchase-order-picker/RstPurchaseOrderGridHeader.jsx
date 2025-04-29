import { Box, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import { RstPOCheckerColumn } from "./columns/RstPOCheckerColumn";
import { RstPODateColumn } from "./columns/RstPODateColumn";
import { RstPOIdColumn } from "./columns/RstPOIdColumn";
import PropTypes from "prop-types";
import OptionPickerGridHeader from "@/shared-components/option-picker/grid/OptionPickerGridHeader";

export const RstPurchaseOrderGridHeader = memo(
	() => {
		return (
			<OptionPickerGridHeader>
				<RstPOIdColumn header>採購單號</RstPOIdColumn>
				<RstPODateColumn header>採購日期</RstPODateColumn>
				<RstPOCheckerColumn header>覆核</RstPOCheckerColumn>
			</OptionPickerGridHeader>
		);
	}
);

RstPurchaseOrderGridHeader.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

RstPurchaseOrderGridHeader.displayName = "PurchaseOrderGridHeader";
