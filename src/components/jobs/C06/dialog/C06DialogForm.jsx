import EmployeePicker from "@/components/picker/EmployeePicker";
import C06 from "@/modules/C06.mjs";
import { FlexBox } from "shared-components";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { FormFieldLabel } from "@/shared-components";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import DeptPicker from "../../../picker/DeptPicker";
import C06SquaredPicker from "./C06SquaredPicker";
import { C06ProdGridBottomToolbar } from "./prod-grid/C06ProdGridBottomToolbar";
import { C06ProdGridContainer } from "./prod-grid/C06ProdGridContainer";

const C06DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		readWorking,
		itemDataReady,
		creating,
		editing,
		squaredFlagDisabled,
		handleSpDeptChanged,
		spDeptDisabled,
		slotProps,
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
						{!creating && (<Grid item xs={24} sm={24} md={3}>
							<TextFieldWrapper
								typo
								name="OrdID"
								label="訂貨單號"
								fullWidth
								// required
								readOnly={true}
							/>
						</Grid>)}
						<Grid item xs={24} sm={24} md={4.5}>
							<DatePickerWrapper
								typo
								autoFocus
								name="OrdDate"
								label="訂貨日期"
								fullWidth
								required
								validate
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4.5}>
							<DatePickerWrapper
								typo
								name="ArrDate"
								label="預計到貨"
								fullWidth
								required
								validate
								variant="outlined"
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={5}>
							<DeptPicker
								typo
								name="spDept"
								label="出貨部門"
								// autoFocus
								excludesSelf
								required
								rules={{
									required: "出貨部門為必填",
								}}
								onChanged={handleSpDeptChanged}
								disabled={spDeptDisabled}
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<EmployeePicker
								typo
								// autoFocus
								label="製單人員"
								name="employee"
								required
								rules={{
									required: "倉管人員為必填",
								}}
								virtualize
								// disableClearable
								disableOpenOnInput
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<C06SquaredPicker
								typo
								name="squared"
								label="結清註記"
								disabled={squaredFlagDisabled}
								disableOpenOnInput
							/>
						</Grid>
						{!creating && (
							<Grid item xs={24} md={5}>
								<FormFieldLabel
									name="transOutOrders"
									label="來源撥出單號"
									stringify={C06.stringifyOrders}
									flex
								/>
							</Grid>
						)}
					</Grid>
					<Box py={1}>
						<C06ProdGridContainer />
					</Box>
					<C06ProdGridBottomToolbar />
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

C06DialogForm.propTypes = {
	creating: PropTypes.bool,
	editing: PropTypes.bool,
	readWorking: PropTypes.bool,
	squaredFlagDisabled: PropTypes.bool,
	spDeptDisabled: PropTypes.bool,
	handleSpDeptChanged: PropTypes.func,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRtnDateChanged: PropTypes.func,
	onSubmit: PropTypes.func,
	slotProps: PropTypes.object,
};

C06DialogForm.displayName = "C06DialogForm";
export default C06DialogForm;
