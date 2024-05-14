import { EmployeePicker } from "@/components/picker/EmployeePicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { OptionPickerProvider } from "@/shared-components/picker/listbox/OptionPickerProvider";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import FormErrorBox from "../../../../shared-components/form/FormErrorBox";
import TaxTypeCheckbox from "../../../checkbox/TaxTypeCheckbox";
import { C04ProdGridContainer } from "./prods/C04ProdGridContainer";
import { SupplierIdPickerContainer } from "../../../picker/SupplierIdPickerContainer";

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
							<Grid item xs={24} sm={24} md={4}>
								<TextFieldWrapper
									typo
									name="GinID"
									label="進貨單號"
									autoFocus
									fullWidth
									required
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
								/>
							</OptionPickerProvider>
						</Grid>

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
									// disabled={supplierPickerDisabled}
									disableClearable
									virtualize
									fadeOutDisabled
									onChanged={handleSupplierChanged}
								/>
							</OptionPickerProvider>
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
								// disabled={supplierNameDisabled}
							/>
						</Grid>
						<FlexBox fullWidth />
						<Grid item xs={24} sm={24} md={4}>
							<TextFieldWrapper
								typo
								name="Uniform"
								label="統編"
								fullWidth
								// value={data?.FactData}
								required
								// disabled={supplierNameDisabled}
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={8}>
							<TextFieldWrapper
								typo
								name="FactAddr"
								label="地址"
								fullWidth
								// value={data?.FactData}
								required
								// disabled={supplierNameDisabled}
							/>
						</Grid>
						<Grid item xs={4} sm={4} md={4}>
							<TaxTypeCheckbox
								typo
								label="稅外加"
								name="TaxType"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<TextFieldWrapper
								typo
								name="InvNo"
								label="發票號碼"
								fullWidth
								required
							/>
						</Grid>

						<Grid item xs={24}>
							<C04ProdGridContainer />
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

C04DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
};

C04DialogForm.displayName = "C04DialogForm";
export default C04DialogForm;
