import TaxExcludedCheckbox from "@/components/checkbox/TaxExcludedCheckbox";
import EmployeePicker from "@/components/picker/EmployeePicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import { RstPurchaseOrderPicker } from "@/components/rst-purchase-order-picker/RstPurchaseOrderPicker";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { C04ProdGridBottomToolbar } from "./prod-grid/C04ProdGridBottomToolbar";
import C04ProdGridBottomToolbar2 from "./prod-grid/C04ProdGridBottomToolbar2";
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
		handleStkDateChanged,
		handleLoadProdsSubmit,
		handleTaxTypeChange,
		isSupplierNameDisabled,
		purchaseOrdersDisabled,
		supplierDisabled,
		// supplier,
		supplierNameDisabled,
		slotProps,
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
			{readError && <FormErrorBox error={readError}  {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={editing ? 1 : 0}>
					<Grid container columns={24} spacing={editing ? 1 : 1}>
						{!creating && (
							<Grid item xs={24} sm={24} md={4}>
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
						<Grid item xs={24} sm={24} md={4.5}>
							<DatePickerWrapper
								typo
								name="GinDate"
								label="進貨日期"
								autoFocus
								fullWidth
								required
								validate
								variant="outlined"
							// onChanged={handleStkDateChanged}
							// onBlur={handleStkDateChanged}
							// rules={{
							// 	validate: {
							// 		validateDate: Forms.validateDate
							// 	}
							// }}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4.5}>
							<EmployeePicker
								typo
								label="倉管人員"
								name="employee"
								required
								rules={{
									required: "倉管人員為必填",
								}}
								virtualize
								// disableClearable
								disableOpenOnInput
								clearOnEscape
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={3.5}>
							<SupplierPicker
								typo
								forId
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
								// disableClearable
								disableOpenOnInput
								clearOnEscape
								slotProps={{
									paper: {
										sx: {
											width: 360,
										},
									},
								}}
								disabled={supplierDisabled}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4.5}>
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
								disabled={supplierNameDisabled}
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
							md={4}
						// justifyContent="center"
						>
							<TaxExcludedCheckbox
								typo
								label="稅外加"
								name="TaxType"
								onChange={handleTaxTypeChange}
							/>
						</FlexGrid>
						<Grid item xs={24} sm={24} md={4.5}>
							<TextFieldWrapper
								typo
								name="InvNo"
								label="發票號碼"
								fullWidth
							// required
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={7.5}>
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

						<Grid item xs={24} sm={24} md={8}>
							<RstPurchaseOrderPicker
								typo
								multiple
								name="purchaseOrders"
								label="採購單"
								// virtualize
								// fadeOutDisabled
								// onChanged={handleLoadProdsSubmit}

								onChanged={handlePurchaseOrdersChanged}
								disabled={purchaseOrdersDisabled}
								disableOpenOnInput
								slotProps={{
									paper: {
										sx: {
											width: 480,
										},
									},
									popper: {
										placement: "bottom"
									}
								}}
							/>
						</Grid>
					</Grid>
					<Box py={1}>
						<C04ProdGridContainer />
					</Box>
					<C04ProdGridBottomToolbar pr={1} />
					{/* <C04AmtToolbar mb={1} /> */}
					<C04ProdGridBottomToolbar2 mb={1} />
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
	creating: PropTypes.bool,
	editing: PropTypes.bool,
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleStkDateChanged: PropTypes.func,
	slotProps: PropTypes.object,
};

C04DialogForm.displayName = "C04DialogForm";
export default C04DialogForm;
