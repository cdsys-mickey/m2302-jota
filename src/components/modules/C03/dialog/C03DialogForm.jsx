import { EmployeePicker } from "@/components/picker/EmployeePicker";
import AlertEx from "@/shared-components/AlertEx";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FormLabelWrapper } from "@/shared-components/label/FormLabelWrapper";
import { OptionPickerProvider } from "@/shared-components/picker/listbox/OptionPickerProvider";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ProdLinePickerContainer } from "../../../picker/ProdLinePickerContainer";
import { C03ProdGridContainer } from "./prods/C03ProdGridContainer";
import FormBox from "../../../../shared-components/form/FormBox";
import FormErrorBox from "../../../../shared-components/form/FormErrorBox";
import { SupplierPickerContainer } from "../../../picker/SupplierPickerContainer";
import { SupplierIdPickerContainer } from "../../../picker/SupplierIdPickerContainer";
import C03SquaredPicker from "../C03SquaredPicker";

const C03DialogForm = memo((props) => {
	const {
		handleSupplierChange,
		onSubmit,
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
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
				<FormBox pt={1}>
					<Grid container columns={24} spacing={editing ? 2 : 1}>
						{!creating && (
							<Grid item xs={24} sm={24} md={5}>
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
						<Grid item xs={24} sm={24} md={5}>
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

						<Grid item xs={24} sm={24} md={5}>
							<DatePickerWrapper
								typo
								name="OrdDate"
								label="採購日期"
								fullWidth
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
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
						<Grid item xs={24} sm={24} md={5}>
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
									onChange={handleSupplierChange}
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={24} md={10}>
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
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
							<C03SquaredPicker
								typo
								name="squared"
								label="結清註記"
							/>
						</Grid>

						<Grid item xs={24}>
							<C03ProdGridContainer />
						</Grid>
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
		</>
	);
});

C03DialogForm.propTypes = {
	handleSupplierChange: PropTypes.func,
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
};

C03DialogForm.displayName = "C03DialogForm";
export default C03DialogForm;
