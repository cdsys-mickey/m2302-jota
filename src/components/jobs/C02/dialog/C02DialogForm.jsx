import EmployeePicker from "@/components/picker/EmployeePicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { FormLabelWrapper } from "@/shared-components/label/FormLabelWrapper";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ProdLinePicker from "@/components/picker/ProdLinePicker";
import { C02ProdGridContainer } from "./prods/C02ProdGridContainer";

const C02DialogForm = memo((props) => {
	const {
		readError,
		readWorking,
		itemDataReady,
		creating,
		editing,
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
					<Grid container columns={24} spacing={1}>
						{!creating && (
							<Grid item xs={24} sm={24} md={3}>
								<TextFieldWrapper
									typo
									name="RqtID"
									label="請購單號"
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
								name="RqtDate"
								label="請購日期"
								autoFocus
								fullWidth
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
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
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={editing ? 5 : 4}>
							<ProdLinePicker
								typo
								label="請購單位"
								name="pdline"
								// D3 非必填，但 API 要求必填, 近幾年的資料都有填，
								// 等客戶要求再調整
								required
								rules={{
									required: "請購單位為必填",
								}}
								virtualize
								disableOpenOnInput
								slotProps={{
									paper: {
										sx: {
											width: 360,
										},
									},
								}}
							/>
						</Grid>
						{
							!editing && (<Grid item xs={24} md={8}>
								<FormLabelWrapper label="覆核" name="Checker_N" />
							</Grid>)
						}
						<Grid item xs={24}>
							<C02ProdGridContainer />
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

C02DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	creating: PropTypes.bool,
	editing: PropTypes.bool,
};

C02DialogForm.displayName = "C02DialogForm";
export default C02DialogForm;
