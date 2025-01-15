import EmployeePicker from "@/components/picker/EmployeePicker";
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
import { D041ProdGridContainer } from "./prod-grid/D041ProdGridContainer";
import ProdLinePicker from "@/components/picker/ProdLinePicker";

const D041DialogForm = memo((props) => {
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
						{!creating && (
							<Grid item xs={24} sm={24} md={5}>
								<TextFieldWrapper
									typo
									name="EntID"
									label="入庫單號"
									autoFocus
									fullWidth
									// required
									readOnly={true}
								/>
							</Grid>
						)}
						<Grid item xs={24} sm={24} md={4}>
							<EmployeePicker
								typo
								label="倉管人員"
								name="employee"
								autoFocus
								required
								rules={{
									required: "倉管人員為必填",
								}}
								virtualize
								// disableClearable
								disableOpenOnInput
								slotProps={{
									paper: {
										sx: {
											width: 240,
										},
									},
								}}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<DatePickerWrapper
								typo
								name="EntDate"
								label="入庫日期"
								fullWidth
								required
								validate
								variant="outlined"
								onChanged={handleRstDateChanged}

							/>
						</Grid>

						<Grid item xs={24} sm={24} md={5}>
							<ProdLinePicker
								typo
								label="生產線別"
								name="pdline"
								required
								rules={{
									required: "入庫線別為必填",
								}}
								// virtualize
								disableOpenOnInput
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
						<D041ProdGridContainer />
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

D041DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRstDateChanged: PropTypes.func,
};

D041DialogForm.displayName = "D041DialogForm";
export default D041DialogForm;
