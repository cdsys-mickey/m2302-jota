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
import { E01CustomerPicker } from "../E01CustomerPicker";
import { E01ProdGridBottomToolbar } from "./grid/E01ProdGridBottomToolbar";
import { E01ProdGridContainer } from "./grid/E01ProdGridContainer";

const E01DialogForm = memo((props) => {
	const {
		readError,
		squaredDisabled,
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
						<Grid container columns={24} spacing={1}>
							{!creating && (<Grid item xs={24} sm={24} md={5}>
								<TextFieldWrapper
									typo
									name="OrdID"
									label="單號"
									// autoFocus
									// fullWidth
									readOnly={true}
								/>
							</Grid>)}
							<Grid item xs={24} sm={24} md={creating ? 5 : 5}>
								<DatePickerWrapper
									typo
									autoFocus
									name="OrdDate"
									label="訂貨日"
									fullWidth
									variant="outlined"
									required
									validate
								// disabled={!creating}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={creating ? 5 : 7}>
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
							<Grid item xs={24} sm={24} md={4}>
								<SquaredPicker
									typo
									name="squared"
									label="結清註記"
									disabled={squaredDisabled}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={3}>
								<CheckboxExWrapper
									typo
									label="詢貨單不列印金額"
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
							<Grid item xs={24} sm={24} md={3}>
								<E01CustomerPicker
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
							<Grid item xs={24} sm={24} md={5}>
								<TextFieldWrapper
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
							<Grid item xs={24} sm={24} md={3}>
								<PaymentPicker
									typo
									label="收款方式"
									name="paymentType"
									disableOpenOnInput
									selectOnFocus
									disableClearable
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
								<TextFieldWrapper
									typo
									label="電話"
									name="CompTel"
									required
									rules={{
										required: "電話為必填"
									}}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={4}>
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
							<Grid item xs={24} sm={24} md={3}>
								<CheckboxExWrapper
									typo
									label="稅外加"
									name="taxExcluded"
									size="medium"
									// labelSlotProps={{
									// 	typography: {
									// 		variant: "subtitle2"
									// 	}
									// }}
									onChange={handleTaxTypeChange}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={8}>
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

								/>
							</Grid>
							<Grid item xs={24} sm={24} md={8}>
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
							<Grid item xs={24}>

							</Grid>
						</Grid>
						<Box py={1}>
							<E01ProdGridContainer />
						</Box>
						<E01ProdGridBottomToolbar />
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

E01DialogForm.propTypes = {
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
	customerRequired: PropTypes.bool,
};

E01DialogForm.displayName = "E01DialogForm";
export default E01DialogForm;


