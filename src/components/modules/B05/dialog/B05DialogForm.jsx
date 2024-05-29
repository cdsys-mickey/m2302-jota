import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import AlertEx from "@/shared-components/AlertEx";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { EmployeePicker } from "@/components/picker/EmployeePicker";
import { SupplierPickerContainer } from "@/components/picker/SupplierPickerContainer";
import { B05QuoteGridContainer } from "./quotes/B05QuoteGridContainer";
import FormBox from "../../../../shared-components/form/FormBox";
import FormErrorBox from "../../../../shared-components/form/FormErrorBox";

const B05DialogForm = memo((props) => {
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
						<Grid item xs={24} sm={24} md={5}>
							<DatePickerWrapper
								typo
								name="InqDate"
								label="詢價日期"
								autoFocus
								fullWidth
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									label="詢價人員"
									name="employee"
									required
									rules={{
										required: "詢價人員為必填",
									}}
									virtualize
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={24} md={8}>
							<OptionPickerProvider>
								<SupplierPickerContainer
									typo
									label="廠商代碼"
									name="supplier"
									required
									rules={{
										required: "廠商為必填",
									}}
									virtualize
								/>
							</OptionPickerProvider>
						</Grid>
						{!creating && (
							<Grid item xs={24} sm={24} md={5}>
								<TextFieldWrapper
									typo
									name="InqID"
									label="詢價單號"
									autoFocus
									fullWidth
									required
									readOnly={true}
								/>
							</Grid>
						)}
						<Grid item xs={24}>
							<B05QuoteGridContainer />
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

B05DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
};

B05DialogForm.displayName = "B05DialogForm";
export default B05DialogForm;
