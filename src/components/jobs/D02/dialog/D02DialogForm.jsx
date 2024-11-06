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
import { D02ProdGridContainer } from "./prod-grid/D02ProdGridContainer";
import ProdLinePicker from "@/components/picker/ProdLinePicker";

const D02DialogForm = memo((props) => {
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
									name="RetID"
									label="退料單號"
									autoFocus
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
								autoFocus
								required
								rules={{
									required: "製單人員為必填",
								}}
								virtualize
								disableClearable
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
							<DatePickerWrapper
								typo
								name="RetDate"
								label="退料日期"
								fullWidth
								required
								validate
								// rules={{
								// 	required: "退料日期為必填",
								// }}
								variant="outlined"
								onChanged={handleRstDateChanged}
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={6}>
							<ProdLinePicker
								typo
								label="退料線別"
								name="pdline"
								required
								rules={{
									required: "退料線別為必填",
								}}
								disableOpenOnInput
								virtualize
							// optionLabelSize="md"
							/>
						</Grid>

						<FlexBox fullWidth />
					</Grid>
					<Box py={1}>
						<D02ProdGridContainer />
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

D02DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRstDateChanged: PropTypes.func,
};

D02DialogForm.displayName = "D02DialogForm";
export default D02DialogForm;
