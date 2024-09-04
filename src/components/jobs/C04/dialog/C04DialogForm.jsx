import TaxExcludedCheckbox from "@/components/checkbox/TaxExcludedCheckbox";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { SupplierIdPickerContainer } from "@/components/picker/SupplierIdPickerContainer";
import { PurchaseOrderPicker } from "@/components/purchase-order-picker/PurchaseOrderPicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import FlexGrid from "@/shared-components/FlexGrid";
import { C04AmtToolbar } from "./prod-grid/C04AmtToolbar";
import { C04ProdGridBottomToolbar } from "./prod-grid/C04ProdGridBottomToolbar";
import { C04ProdGridContainer } from "./prod-grid/C04ProdGridContainer";

const C04DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleSupplierChanged,
		handlePurchaseOrdersChanged,
		handleRstDateChanged,
		handleLoadProdsSubmit,
		handleTaxTypeChanged,
		isSupplierNameDisabled,
		purchaseOrdersDisabled,
		supplier,
		...rest
	} = props;
	return (
		<form onSubmit={onSubmit}>
			{readWorking && (
				<Container maxWidth="xs">
					<FlexBox justifyContent="center" minHeight="30em">
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				</Container>
			)}
			{readError && <FormErrorBox error={readError} />}
			{itemDataReady && (
				<FormBox pt={editing ? 1 : 0}>
					<Grid container columns={24} spacing={editing ? 1 : 1}>
						{!creating && (
							<Grid item xs={24} sm={24} md={3}>
								<TextFieldWrapper
									typo
									name="GinID"
									label="進貨單號"
									autoFocus
									fullWidth
									// required
									readOnly={true}
								/>
							</Grid>
						)}
						<Grid item xs={24} sm={24} md={4}>
							<DatePickerWrapper
								typo
								name="GinDate"
								label="進貨日期"
								autoFocus
								fullWidth
								required
								variant="outlined"
								onChanged={handleRstDateChanged}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									label="倉管人員"
									name="employee"
									required
									rules={{
										required: "倉管人員為必填",
									}}
									virtualize
									disableClearable
									disableOpenOnInput
								/>
							</OptionPickerProvider>
						</Grid>

						<Grid item xs={24} sm={24} md={3}>
							<OptionPickerProvider>
								<SupplierIdPickerContainer
									typo
									label="廠商代碼"
									name="supplier"
									required
									rules={{
										required: "廠商代碼為必填",
									}}
									virtualize
									withAddr
									optionLabelSize="md"
									onChanged={handleSupplierChanged}
									disableClearable
									disableOpenOnInput
									componentsProps={{
										paper: {
											sx: {
												width: 360,
											},
										},
									}}
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<TextFieldWrapper
								typo
								name="FactData"
								label="廠商名稱"
								fullWidth
								// value={data?.FactData}
								required
								rules={{
									required: "廠商名稱為必填",
								}}
								disabled={isSupplierNameDisabled(supplier)}
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={3}>
							<TextFieldWrapper
								typo
								name="Uniform"
								label="統編"
								fullWidth
							// value={data?.FactData}
							// required
							// disabled={supplierNameDisabled}
							/>
						</Grid>
						<FlexBox fullWidth />
						<FlexGrid
							item
							xs={4}
							sm={4}
							md={3}
						// justifyContent="center"
						>
							<TaxExcludedCheckbox
								typo
								label="稅外加"
								name="TaxType"
								onChanged={handleTaxTypeChanged}
							/>
						</FlexGrid>
						<Grid item xs={24} sm={24} md={4}>
							<TextFieldWrapper
								typo
								name="InvNo"
								label="發票號碼"
								fullWidth
							// required
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={7}>
							<TextFieldWrapper
								typo
								name="FactAddr"
								label="地址"
								fullWidth
							// value={data?.FactData}
							// required
							// disabled={supplierNameDisabled}
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={10}>
							{/* <OptionPickerProvider> */}
							<PurchaseOrderPicker
								typo
								multiple
								name="purchaseOrders"
								label="採購單"
								// virtualize
								// fadeOutDisabled
								// onChanged={handleLoadProdsSubmit}
								onChanged={handlePurchaseOrdersChanged}
								disabled={purchaseOrdersDisabled || !supplier}
								disableOpenOnInput
							/>
							{/* </OptionPickerProvider> */}
						</Grid>
					</Grid>
					<Box py={1}>
						<C04ProdGridContainer />
					</Box>
					<C04ProdGridBottomToolbar />
					<C04AmtToolbar mb={1} />
					<Grid container columns={24}>
						<Grid item xs={24}>
							<TextFieldWrapper
								typo
								name="remark"
								multiline
								minRows={2}
								maxRows={5}
								label="備註"
								fullWidth
							/>
						</Grid>
					</Grid>
				</FormBox>
			)}
		</form>
	);
});

C04DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRstDateChanged: PropTypes.func,
};

C04DialogForm.displayName = "C04DialogForm";
export default C04DialogForm;
