import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useMemo } from "react";
import queryString from "query-string";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";
import { useWatch } from "react-hook-form";
import PurchaseOrders from "@/modules/md-purchase-orders";
import { SupplierPurchaseOrderPaper } from "./SupplierPurchaseOrderPaper";
import SupplierPurchaseOrderPickerListbox from "./SupplierPurchaseOrderPickerListbox";
import { useCallback } from "react";
import { Grid, Typography } from "@mui/material";

export const SupplierPurchaseOrderPicker = (props) => {
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

	// const isOptionEqualToValue = useCallback((option, value) => {
	// 	return PurchaseOrders.isOptionEqualToValue(option, value);
	// }, []);

	// const getOptionLabel = useCallback((option) => {
	// 	return PurchaseOrders.getOptionLabel(option);
	// }, []);

	// const renderTagLabel = useCallback((option) => {
	// 	return PurchaseOrders.renderTagLabel(option);
	// }, []);

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
			PaperComponent={SupplierPurchaseOrderPaper}
			// ListboxComponent={SupplierPurchaseOrderPickerListbox}
			// disableClose
			renderOption={renderOption}
			{...rest}
		/>
	);
};

SupplierPurchaseOrderPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	// supplierId: PropTypes.string,
	// supplierName: PropTypes.string,
};

SupplierPurchaseOrderPicker.displayName = "SupplierPurchaseOrderPicker";
