import TaxExcludedCheckbox from "@/components/checkbox/TaxExcludedCheckbox";
import { EmployeePicker } from "@/components/picker/EmployeePicker";
import { SupplierIdPickerContainer } from "@/components/picker/SupplierIdPickerContainer";
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
import FlexGrid from "../../../../shared-components/FlexGrid";
import { C07ProdGridBottomToolbar } from "./prod-grid/C07ProdGridBottomToolbar";
import { C07ProdGridContainer } from "./prod-grid/C07ProdGridContainer";
import DeptPickerContainer from "../../../DeptPickerContainer";
import SquaredPicker from "../../../picker/SquaredPicker";
import { FormFieldLabelContainer } from "../../../../shared-components/form/FormFieldLabelContainer";
import C07 from "../../../../modules/md-c07";

const C07DialogForm = memo((props) => {
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
		handleRtnDateChanged,
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
						<Grid item xs={24} sm={24} md={3}>
							<TextFieldWrapper
								typo
								name="OrdID"
								label="訂貨單號"
								autoFocus
								fullWidth
								// required
								readOnly={true}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<DatePickerWrapper
								typo
								name="OrdDate"
								label="訂貨日期"
								autoFocus
								fullWidth
								required
								variant="outlined"
								onChanged={handleRtnDateChanged}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<DatePickerWrapper
								typo
								name="ArrDate"
								label="預計到貨"
								fullWidth
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									label="製單人員"
									name="employee"
									required
									rules={{
										required: "製單人員為必填",
									}}
									virtualize
									disableClearable
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
							<DeptPickerContainer
								typo
								name="ordDept"
								label="訂貨部門"
								autoFocus
								excludesSelf
								required
								rules={{
									required: "訂貨部門為必填",
								}}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={3}>
							<SquaredPicker
								typo
								name="squared"
								label="結清註記"
							/>
						</Grid>
						<Grid item xs={24} md={5}>
							<FormFieldLabelContainer
								name="transOutOrders"
								label="來源撥出單號"
								stringify={C07.stringifyOrders}
								flex
							/>
						</Grid>
					</Grid>
					<Box py={1}>
						<C07ProdGridContainer />
					</Box>
					<C07ProdGridBottomToolbar />
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

C07DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRtnDateChanged: PropTypes.func,
};

C07DialogForm.displayName = "C07DialogForm";
export default C07DialogForm;