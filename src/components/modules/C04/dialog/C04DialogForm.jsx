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
import { C04ProdGridContainer } from "./prods/C04ProdGridContainer";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "../../../../shared-components/form/FormErrorBox";

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
						<Grid item xs={24} sm={24} md={5}>
							<OptionPickerProvider>
								<ProdLinePickerContainer
									typo
									label="請購單位"
									name="pdline"
									required
									rules={{
										required: "請購單位為必填",
									}}
									virtualize
								/>
							</OptionPickerProvider>
						</Grid>

						<Grid item xs={24}>
							<FormLabelWrapper label="覆核" name="Checker_N" />
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
