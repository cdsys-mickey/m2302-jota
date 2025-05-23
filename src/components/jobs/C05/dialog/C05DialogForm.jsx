import TaxExcludedCheckbox from "@/components/checkbox/TaxExcludedCheckbox";
import EmployeePicker from "@/components/picker/EmployeePicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import C05RtnDatePickerContainer from "./C05RtnDatePicker";
import { C05ProdGridBottomToolbar } from "./prod-grid/C05ProdGridBottomToolbar";
import { C05ProdGridContainer } from "./prod-grid/C05ProdGridContainer";
import C05ProdGridBottomToolbar2 from "./toolbar/C05ProdGridBottomToolbar2";

const C05DialogForm = memo((props) => {
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
		// handleRtnDateChanged,
		handleLoadProdsSubmit,
		handleTaxTypeChange,
		isSupplierNameDisabled,
		purchaseOrdersDisabled,
		supplier,
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
			{readError && <FormErrorBox error={readError} {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={editing ? 1 : 0}>
					<Grid container columns={24} spacing={editing ? 1 : 1}>
						{!creating && (<Grid item xs={24} sm={24} md={3.5}>
							<TextFieldWrapper
								typo
								name="GrtID"
								label="退貨單號"
								autoFocus
								fullWidth
								// required
								readOnly={true}
							/>
						</Grid>)}

						<Grid item xs={24} sm={24} md={4.5}>
							<C05RtnDatePickerContainer
								typo
								name="GrtDate"
								label="退貨日期"
								autoFocus
								fullWidth
								required
								validate
								variant="outlined"
								disableOpenOnInput
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
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={3}>
							<TextFieldWrapper
								typo
								name="InvNo"
								label="發票號碼"
								fullWidth
							/>
						</Grid>
						<FlexBox fullWidth />

						<Grid item xs={24} sm={24} md={3.5}>
							<SupplierPicker
								typo
								label="廠商代碼"
								name="supplier"
								required
								rules={{
									required: "廠商代碼為必填",
								}}
								// disabled={supplierPickerDisabled}
								// disableClearable
								virtualize
								// fadeOutDisabled
								forId
								withAddr
								optionLabelSize="md"
								onChanged={handleSupplierChanged}
								disableOpenOnInput
								// disableClearable
								slotProps={{
									paper: {
										sx: {
											width: 360,
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
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
								onChange={handleTaxTypeChange}
							/>
						</FlexGrid>
						<Grid item xs={24} sm={24} md={8.5}>
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



					</Grid>
					<Box py={1}>
						<C05ProdGridContainer />
					</Box>
					<C05ProdGridBottomToolbar />
					{/* <C05AmtToolbar mb={1} /> */}
					<C05ProdGridBottomToolbar2 mb={1} />
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

C05DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRtnDateChanged: PropTypes.func,
	slotProps: PropTypes.object,
};

C05DialogForm.displayName = "C05DialogForm";
export default C05DialogForm;
