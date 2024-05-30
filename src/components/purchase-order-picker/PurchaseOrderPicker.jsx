import { AuthContext } from "@/contexts/auth/AuthContext";
import PurchaseOrders from "@/modules/md-purchase-orders";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { PurchaseOrderPickerPaper } from "./PurchaseOrderPickerPaper";

export const PurchaseOrderPicker = (props) => {
	const { label = "採購單", ...rest } = props;
	const { token } = useContext(AuthContext);

	const supplier = useWatch({
		name: "supplier",
	});
	const supplierName = useWatch({
		name: "FactData",
	});

	const querystring = useMemo(() => {
		const obj = {
			tp: 1000,
			spi: supplier?.FactID,
			spn: supplierName,
		};
		return queryString.stringify(obj);
	}, [supplier?.FactID, supplierName]);

	const disabled = useMemo(() => {
		return !supplier || !supplierName;
	}, [supplier, supplierName]);

	const renderOption = useCallback(
		({ key, style, ...optionProps }, option) => {
			return (
				<li key={key} style={style} {...optionProps}>
					<Grid container columns={24} spacing={2}>
						<Grid item xs={24} sm={5}>
							<Typography variant="body2">
								{option["採購單號"]}
							</Typography>
						</Grid>
						<Grid item xs={24} sm={5}>
							<Typography variant="body2">
								{option["採購日"]}
							</Typography>
						</Grid>
						<Grid item xs={24} sm={14}>
							<Typography variant="body2">
								{option["覆核人員"]}
							</Typography>
						</Grid>
					</Grid>
				</li>
			);
		},
		[]
	);

	return (
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url={`v1/purchase/restocks/purchase-orders`}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={PurchaseOrders.getOptionLabel}
			isOptionEqualToValue={PurchaseOrders.isOptionEqualToValue}
			renderTagLabel={PurchaseOrders.renderTagLabel}
			disabled={disabled}
			// disableCloseOnSelect
			optionLabelSize="small"
			PaperComponent={PurchaseOrderPickerPaper}
			// ListboxComponent={PurchaseOrderPickerListbox}
			// disableClose
			renderOption={renderOption}
			{...rest}
		/>
	);
};

PurchaseOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	// supplierId: PropTypes.string,
	// supplierName: PropTypes.string,
};

PurchaseOrderPicker.displayName = "PurchaseOrderPicker";
