import EmployeePicker from "@/components/picker/EmployeePicker";
import ProdLinePicker from "@/components/picker/ProdLinePicker";
import { FlexBox } from "@/shared-components";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { C01ProdGridContainer } from "./prods/C01ProdGridContainer";

const C01DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
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
			{readError && <FormErrorBox error={readError}  {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={1}>
					<Grid container columns={24} spacing={1}>
						{!creating && (
							<Grid item xs={24} sm={24} md={3}>
								<TextFieldWrapper
									typo
									name="RqtID"
									label="請購單號"
									// autoFocus
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
								validate
								variant="outlined"
								readOnly={true}
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
								readOnly={true}
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={editing ? 5 : 4}>
							<ProdLinePicker
								typo
								label="請購單位"
								name="pdline"
								required
								rules={{
									required: "請購單位為必填",
								}}
								virtualize
								readOnly={true}
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

						{/* <Grid item xs={8}>
							<FormLabelWrapper label="覆核" name="Checker_N" />
						</Grid> */}
						<Grid item xs={24}>
							<C01ProdGridContainer />
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

C01DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	slotProps: PropTypes.object,
};

C01DialogForm.displayName = "C01DialogForm";
export default C01DialogForm;
