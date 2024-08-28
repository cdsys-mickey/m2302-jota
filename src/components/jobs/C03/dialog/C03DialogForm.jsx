import EmployeePicker from "@/components/picker/EmployeePicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import FormBox from "../../../../shared-components/form/FormBox";
import FormErrorBox from "../../../../shared-components/form/FormErrorBox";
import { FormFieldLabelContainer } from "../../../../shared-components/form/FormFieldLabelContainer";
import { SupplierIdPickerContainer } from "../../../picker/SupplierIdPickerContainer";
import C03SquaredPicker from "../C03SquaredPicker";
import { C03DialogRstLabel } from "./C03DialogRstLabel";
import { C03ProdGridBottomToolbar } from "./prods/C03ProdGridBottomToolbar";
import { C03ProdGridContainer } from "./prods/C03ProdGridContainer";

const C03DialogForm = memo((props) => {
	const {
		handleSupplierChanged,
		handleOrdDateChanged,
		onSubmit,
		readError,
		readWorking,
		itemDataReady,
		supplierPickerDisabled,
		supplierNameDisabled,
		squaredFlagDisabled,
		creating,
		editing,
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
				<FormBox pt={1}>
					<Grid container columns={24} spacing={editing ? 1 : 0}>
						{!creating && (
							<Grid item xs={24} sm={24} md={4}>
								<TextFieldWrapper
									typo
									name="OrdID"
									label="採購單號"
									fullWidth
									required
									readOnly={true}
								/>
							</Grid>
						)}
						<Grid item xs={24} sm={24} md={4}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									autoFocus
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

						<Grid item xs={24} sm={24} md={4}>
							<DatePickerWrapper
								typo
								name="OrdDate"
								label="採購日期"
								fullWidth
								required
								variant="outlined"
								onChanged={handleOrdDateChanged}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<DatePickerWrapper
								typo
								name="ArrDate"
								label="預計到貨日期"
								fullWidth
								required
								variant="outlined"
							/>
						</Grid>
						<FlexBox fullWidth />
						<Grid item xs={24} sm={24} md={4}>
							<OptionPickerProvider>
								<SupplierIdPickerContainer
									typo
									label="廠商代碼"
									name="supplier"
									required
									rules={{
										required: "廠商代碼為必填",
									}}
									disabled={supplierPickerDisabled}
									disableClearable
									virtualize
									// fadeOutDisabled
									optionLabelSize="md"
									onChanged={handleSupplierChanged}
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={24} md={8}>
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
								// disabled={isSupplierNameDisabled(supplier)}
								disabled={supplierNameDisabled}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={3}>
							<C03SquaredPicker
								typo
								name="squared"
								label="結清註記"
								disabled={squaredFlagDisabled}
							/>
						</Grid>
						<FlexBox fullWidth />

						<Grid item xs={24} md={5}>
							<C03DialogRstLabel
								name="GinID_N"
								label="進貨單"
								flex
							/>
						</Grid>
						<Grid item xs={24} md={5}>
							<FormFieldLabelContainer
								name="RqtID_N"
								label="請購單"
								flex
							/>
						</Grid>
						<Grid item xs={24} md={14}>
							<FormFieldLabelContainer
								name="Checker_N"
								label="覆核"
								flex
							/>
						</Grid>
					</Grid>
					<Box py={1}>
						<C03ProdGridContainer />
					</Box>
					<C03ProdGridBottomToolbar />
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
						{/* <Grid item xs={24} md={10}>
							<Box pl={1}>
								<C03DialogCheckerLabel
									label="覆核"
									name="Checker_N"
								/>
							</Box>
						</Grid> */}
					</Grid>
				</FormBox>
			)}
		</form>
	);
});

C03DialogForm.propTypes = {
	handleSupplierChange: PropTypes.func,
	handleSupplierChanged: PropTypes.func,
	handleOrdDateChanged: PropTypes.func,
	onSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	supplierPickerDisabled: PropTypes.bool,
	supplierNameDisabled: PropTypes.bool,
	squaredFlagDisabled: PropTypes.bool,
	creating: PropTypes.bool,
	editing: PropTypes.bool,
};

C03DialogForm.displayName = "C03DialogForm";
export default C03DialogForm;
