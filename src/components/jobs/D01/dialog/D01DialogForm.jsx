import EmployeePicker from "@/components/picker/EmployeePicker";
import ProdLinePicker from "@/components/picker/ProdLinePicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { D01ProdGridContainer } from "./prod-grid/D01ProdGridContainer";

const D01DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleRstDateChanged,
		validateDate,
		slotProps,
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
			{readError && <FormErrorBox error={readError}  {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={editing ? 1 : 0}>
					<Grid container columns={24} spacing={editing ? 1 : 1}>
						{!creating && (
							<Grid item xs={24} sm={24} md={5}>
								<TextFieldWrapper
									typo
									name="OutID"
									label="領料單號"
									fullWidth
									// required
									readOnly={true}
								/>
							</Grid>
						)}
						<Grid item xs={24} sm={24} md={6}>
							<EmployeePicker
								typo
								label="製單人員"
								name="employee"
								selectOnFocus
								autoFocus
								required
								rules={{
									required: "製單人員為必填",
								}}
								virtualize
								// disableClearable
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
							<DatePickerWrapper
								typo
								name="OutDate"
								label="領料日期"
								fullWidth
								required
								validate
								variant="outlined"
								onChanged={handleRstDateChanged}
							// rules={{
							// 	validate: {
							// 		validateDate
							// 	}
							// }}
							// clearable
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={6}>
							<ProdLinePicker
								typo
								label="領料線別"
								name="pdline"
								required
								rules={{
									required: "領料線別為必填",
								}}
								disableOpenOnInput
								// disableClearable
								slotProps={{
									paper: {
										sx: {
											width: 240,
										},
									},
								}}
							/>
						</Grid>

						<FlexBox fullWidth />
					</Grid>
					<Box py={1}>
						<D01ProdGridContainer />
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
			)}
		</form>
	);
});

D01DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRstDateChanged: PropTypes.func,
	validateDate: PropTypes.func,
	slotProps: PropTypes.object,
};

D01DialogForm.displayName = "D01DialogForm";
export default D01DialogForm;
