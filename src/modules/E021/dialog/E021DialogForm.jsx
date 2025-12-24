import { CustomerPurchaseOrderPicker } from "@/components/customer-purchase-order-picker/CustomerPurchaseOrderPicker";
import PaymentPicker from "@/components/PaymentPicker/PaymentPickerContainer";
import EmployeePicker from "@/components/picker/EmployeePicker";
import TransportTypePicker from "@/components/tranport-type-picker/TransportTypePicker";
import { CheckboxExField } from "@/shared-components";
import { AdaptiveCustomerPicker } from "@/shared-components/CustomerPicker/AdaptiveCustomerPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { memo } from "react";
import { E021ProdGridBottomToolbar } from "./grid/E021ProdGridBottomToolbar";
import { E021ProdGridContainer } from "./grid/E021ProdGridContainer";

const E021DialogForm = memo((props) => {
	const {
		readError,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleCustomerOrdersChanged,
		// customerOrdersDisabled,
		handleRetailChange,
		handleCustomerChange,
		validateCustomer,
		customerRequired,
		handleTaxTypeChange,
		slotProps,
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
			{readError && <FormErrorBox error={readError} {...slotProps?.error} />}
			{itemDataReady && (
				<>
					<FormBox pt={1}>
						<Grid container columns={24} spacing={0.8}>
							{!creating && (<Grid item md={6.5}>
								<TextFieldWrapper
									typo
									name="SalID"
									label="單號"
									fullWidth
									readOnly={true}
								/>
							</Grid>)}
							<Grid item md={4.5}>
								<DatePickerWrapper
									typo
									autoFocus
									name="SalDate"
									label="銷貨日"
									variant="outlined"
									fullWidth
									required
									validate
								// disabled={!creating}
								/>
							</Grid>
							<Grid item md={4.5}>
								<DatePickerWrapper
									typo
									name="ArrDate"
									label="到貨日"
									variant="outlined"
									fullWidth
									required
									validate
								// disabled={!creating}
								/>
							</Grid>
							<Grid item md={4.5}>
								<DatePickerWrapper
									typo
									name="RetDate"
									label="退貨期限日"
									variant="outlined"
									fullWidth
									// required
									validate
								// disabled={!creating}
								/>
							</Grid>

							<Grid item md={3} lg={4}>
								<CheckboxExField
									typo
									variant="outlined"
									label="不列印金額"
									name="dontPrtAmt"
									size="small"
									color="secondary"
									slotProps={{
										label: {
											typography: {
												variant: "body2",
											}
										}
									}}
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item md={2.5}>
								<CheckboxExField
									fullWidth
									typo
									size="small"
									variant="outlined"
									label="零售"
									name="retail"
									onChange={handleRetailChange}
								/>
							</Grid>
							<Grid item md={4}>
								<AdaptiveCustomerPicker
									retailName="retail"
									forId
									typo
									name="customer"
									virtualize
									// sharedKey="customer"
									disableOpenOnInput
									selectOnFocus
									// disableClearable
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
							<Grid item md={8}>
								<CustomerPurchaseOrderPicker
									typo
									multiple
									name="customerOrders"
									label="訂購單號"
									// virtualize
									// fadeOutDisabled
									onChanged={handleCustomerOrdersChanged}
									// disabled={customerOrdersDisabled}
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

							<Grid item md={6}>
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
							<Grid item md={4}>
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

							<Grid item md={5}>
								<EmployeePicker
									typo
									label="業務員"
									name="employee"
									required
									rules={{
										required: "業務員為必填"
									}}
									virtualize
									disableOpenOnInput
								// disableClearable
								// disabled={!creating}
								/>
							</Grid>

							<Grid item md={8.5}>
								<TextFieldWrapper
									typo
									label="送貨地址"
									name="RecAddr"
									fullWidth
								/>
							</Grid>
							<Grid item md={4}>
								<TransportTypePicker
									typo
									name="transType"
									label="貨運方式"
									disableOpenOnInput
									// disableClearable
									slotProps={{
										paper: {
											sx: {
												width: 200,
											},
										},
									}}
								/>
							</Grid>
							<Grid item md={2.5}>
								<CheckboxExField
									typo
									label="稅外加"
									fullWidth
									variant="outlined"
									name="taxExcluded"
									// size="small"
									slotProps={{
										label: {
											typography: {
												variant: "body2",
											}
										}
									}}
									onChange={handleTaxTypeChange}
								/>
							</Grid>
							<Grid item md={4}>
								<PaymentPicker
									typo
									label="收款方式"
									name="paymentType"
									disableOpenOnInput
									selectOnFocus
								// disableClearable
								/>
							</Grid>

							<Grid item md={6}>
								<TextFieldWrapper
									typo
									label="發票地址"
									name="InvAddr"
									fullWidth
								/>
							</Grid>
							<Grid item md={4}>
								<TextFieldWrapper
									typo
									label="統一編號"
									name="UniForm"
								/>
							</Grid>
							<Grid item md={5}>
								<EmployeePicker
									typo
									label="配送人"
									name="deliveryEmployee"
									virtualize
									disableOpenOnInput
								/>
							</Grid>
							<Grid item md={5}>
								<TextFieldWrapper
									typo
									name="HDNo"
									label="宅配通單號"
									fullWidth
								/>
							</Grid>
							<Grid item md={4}>
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
							<E021ProdGridBottomToolbar />
						</Box>
						<Grid container columns={24}>
							<Grid item xs={24}>
								<TextFieldWrapper
									typo
									name="remark"
									multiline
									minRows={1}
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
	handleCustomerChange: PropTypes.func,
	validateCustomer: PropTypes.func,
	handleCustomerOrdersChanged: PropTypes.func,
	customerRequired: PropTypes.bool,
	// customerOrdersDisabled: PropTypes.bool,
	slotProps: PropTypes.object,
};

E021DialogForm.displayName = "E021DialogForm";
export default E021DialogForm;



