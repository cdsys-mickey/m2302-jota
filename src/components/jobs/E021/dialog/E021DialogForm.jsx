import EmployeePicker from "@/components/picker/EmployeePicker";
import SquaredPicker from "@/components/picker/SquaredPicker";
import TransportTypePicker from "@/components/tranport-type-picker/TransportTypePicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { memo } from "react";
import PaymentPicker from "../../A06/form/fields/PaymentPicker";
import { E021CustomerPicker } from "../E021CustomerPicker";
import { E021ProdGridBottomToolbar } from "./grid/E021ProdGridBottomToolbar";
import { E021ProdGridContainer } from "./grid/E021ProdGridContainer";
import SalesOrderPicker from "@/components/sales-order-picker/SalesOrderPicker";
import { CustomerPurchaseOrderPicker } from "@/components/customer-purchase-order-picker/CustomerPurchaseOrderPicker";

const E021DialogForm = memo((props) => {
	const {
		readError,
		squaredDisabled,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleCustomerOrdersChanged,
		customerOrdersDisabled,
		handleRetailChange,
		handleCustomerChange,
		validateCustomer,
		customerRequired,
		handleTaxTypeChange,
		// handleRecdAmtChange,
		...rest
	} = props;
	return (
		<>
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
				<>
					<FormBox pt={1}>
						<Grid container columns={24} spacing={0.8}>
							{!creating && (<Grid item xs={24} sm={24} md={6}>
								<TextFieldWrapper
									typo
									name="SalID"
									label="單號"
									// fullWidth
									readOnly={true}
								/>
							</Grid>)}
							<Grid item xs={24} sm={24} md={4}>
								<DatePickerWrapper
									typo
									autoFocus
									name="SalDate"
									label="銷貨日"
									fullWidth
									required
									variant="outlined"
								// disabled={!creating}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<DatePickerWrapper
									typo
									name="ArrDate"
									label="到貨日"
									fullWidth
									required
									variant="outlined"
								// disabled={!creating}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<DatePickerWrapper
									typo
									name="RetDate"
									label="退貨期限日"
									fullWidth
									required
									variant="outlined"
								// disabled={!creating}
								/>
							</Grid>

							<Grid item xs={24} sm={24} md={3} lg={4}>
								<CheckboxExWrapper
									typo
									label="不列印金額"
									name="dontPrtAmt"
									size="medium"
									color="secondary"
									labelSlotProps={{
										typography: {
											variant: "body2",
											// sx: {
											// 	fontSize: 10
											// }
										}
									}}
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={24} sm={24} md={2}>
								<CheckboxExWrapper
									typo
									label="零售"
									name="retail"
									onChange={handleRetailChange}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<E021CustomerPicker
									retailName="retail"
									forId
									typo
									name="customer"
									virtualize
									disableOpenOnInput
									selectOnFocus
									disableClearable
									onChanged={handleCustomerChange}
									required={customerRequired}
									rules={{
										validate: validateCustomer
									}}
									slotProps={{
										paper: {
											sx: {
												width: 360,
											},
										},
									}}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={9}>
								<CustomerPurchaseOrderPicker
									typo
									multiple
									name="customerOrders"
									label="訂購單號"
									// virtualize
									// fadeOutDisabled
									// onChanged={handleLoadProdsSubmit}
									onChanged={handleCustomerOrdersChanged}
									disabled={customerOrdersDisabled}
									disableOpenOnInput
									// disableClose
									slotProps={{
										paper: {
											sx: {
												width: 660,
											},
										},
										popper: {
											placement: "bottom"
										}
									}}
								/>
							</Grid>

							<Grid item xs={24} sm={24} md={5}>
								<TextFieldWrapper
									// dense
									typo
									label="客戶名稱"
									name="CustName"
									fullWidth
									required
									rules={{
										required: "客戶名稱為必填"
									}}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<TextFieldWrapper
									typo
									label="電話"
									name="CompTel"
									fullWidth
									required
									rules={{
										required: "電話為必填"
									}}
								/>
							</Grid>

							<Grid item xs={24} sm={24} md={6}>
								<EmployeePicker
									typo
									label="業務員"
									name="employee"
									virtualize
									disableOpenOnInput
									disableClearable
								// disabled={!creating}
								/>
							</Grid>

							<Grid item xs={24} sm={24} md={9}>
								<TextFieldWrapper
									typo
									label="送貨地址"
									name="RecAddr"
									fullWidth
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={3}>
								<TransportTypePicker
									typo
									name="transType"
									label="貨運方式"
									disableOpenOnInput
									disableClearable
									slotProps={{
										paper: {
											sx: {
												width: 200,
											},
										},
									}}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={2}>
								<CheckboxExWrapper
									typo
									label="稅外加"
									name="taxExcluded"
									size="medium"
									labelSlotProps={{
										typography: {
											variant: "body2",
											// sx: {
											// 	fontSize: 10
											// }
										}
									}}
									onChange={handleTaxTypeChange}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<PaymentPicker
									typo
									label="收款方式"
									name="paymentType"
									disableOpenOnInput
									selectOnFocus
									disableClearable
								/>
							</Grid>

							<Grid item xs={24} sm={24} md={6}>
								<TextFieldWrapper
									typo
									label="發票地址"
									name="InvAddr"
									fullWidth
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<TextFieldWrapper
									typo
									label="統一編號"
									name="UniForm"
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={5}>
								<EmployeePicker
									typo
									label="配送人"
									name="deliveryEmployee"
									virtualize
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={5}>
								<TextFieldWrapper
									typo
									name="HDNo"
									label="宅配通單號"
									fullWidth
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<TextFieldWrapper
									typo
									name="InvNo"
									label="發票號碼"
									fullWidth
								// required
								/>
							</Grid>
						</Grid>
						<Box py={1}>
							<E021ProdGridContainer />
						</Box>
						<E021ProdGridBottomToolbar my={0} />
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

				</>
			)}
		</>
	);
});

E021DialogForm.propTypes = {
	creating: PropTypes.bool,
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	squaredDisabled: PropTypes.bool,
	handleRetailChange: PropTypes.func,
	handleTaxTypeChange: PropTypes.func,
	// handleRecdAmtChange: PropTypes.func,
	handleCustomerChange: PropTypes.func,
	validateCustomer: PropTypes.func,
	customerRequired: PropTypes.bool,
};

E021DialogForm.displayName = "E021DialogForm";
export default E021DialogForm;



