import { PaymentPicker } from "@/components";
import EmployeePicker from "@/components/picker/EmployeePicker";
import TransportTypePicker from "@/components/tranport-type-picker/TransportTypePicker";
import { CheckboxExField, DatePickerEx } from "@/shared-components";
import { AdaptiveCustomerPicker } from "@/shared-components/CustomerPicker/AdaptiveCustomerPicker";
import FlexBox from "@/shared-components/FlexBox";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { memo } from "react";
import { E03ProdGridBottomToolbar } from "./grid/E03ProdGridBottomToolbar";
import { E03ProdGridContainer } from "./grid/E03ProdGridContainer";

const E03DialogForm = memo((props) => {
	const {
		readError,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleRetailChange,
		handleCustomerChange,
		validateCustomer,
		customerRequired,
		handleTaxTypeChange,
		// handleRecdAmtChange,
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
							{!creating && (<Grid item xs={24} sm={24} md={6}>
								<TextFieldWrapper
									typo
									name="RetID"
									label="單號"
									fullWidth
									readOnly={true}
								/>
							</Grid>)}
							<Grid item xs={24} sm={24} md={4.5}>
								<DatePickerEx
									typo
									autoFocus
									name="RetDate"
									label="銷退日期"
									fullWidth
									required
									variant="outlined"
									validate
								// disabled={!creating}
								/>
							</Grid>


							<Grid item xs={24} sm={24} md={2}>
								<CheckboxExField
									typo
									label="零售"
									name="retail"
									onChange={handleRetailChange}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<AdaptiveCustomerPicker
									retailName="retail"
									forId
									typo
									name="customer"
									virtualize
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
							<Grid item xs={24} sm={24} md={4}>
								<PaymentPicker
									typo
									label="收款方式"
									name="paymentType"
									disableOpenOnInput
									selectOnFocus
								// disableClearable
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={24} sm={24} md={6.5}>
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

							<Grid item xs={24} sm={24} md={4.5}>
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
							<Grid item xs={24} sm={24} md={2}>
								<CheckboxExField
									typo
									label="稅外加"
									name="taxExcluded"
									size="medium"
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
							<FlexBox fullWidth />
							<Grid item xs={24} sm={24} md={6.5}>
								<TextFieldWrapper
									typo
									label="送貨地址"
									name="RecAddr"
									fullWidth
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
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


							<Grid item xs={24} sm={24} md={6.5}>
								<TextFieldWrapper
									typo
									label="發票地址"
									name="InvAddr"
									fullWidth
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={3.5}>
								<TextFieldWrapper
									typo
									name="InvNo"
									label="發票號碼"
									fullWidth
								// required
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={3.5}>
								<TextFieldWrapper
									typo
									label="統一編號"
									name="UniForm"
								/>
							</Grid>
						</Grid>
						<Box py={1}>
							<E03ProdGridContainer />
							<E03ProdGridBottomToolbar />
						</Box>
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

E03DialogForm.propTypes = {
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
	slotProps: PropTypes.object,
};

E03DialogForm.displayName = "E03DialogForm";
export default E03DialogForm;




