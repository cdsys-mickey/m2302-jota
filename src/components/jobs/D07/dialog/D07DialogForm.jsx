import { EmployeePicker } from "@/components/picker/EmployeePicker";
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
import { D07ProdGridContainer } from "./prod-grid/D07ProdGridContainer";
import { ProdLinePickerContainer } from "../../../picker/ProdLinePickerContainer";

const D07DialogForm = memo((props) => {
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
						<Grid item xs={24} sm={24} md={5}>
							<TextFieldWrapper
								typo
								name="CalID"
								label="試算單號"
								autoFocus
								fullWidth
								required
								rules={{
									required: "試算單號為必填",
								}}
								readOnly={!editing}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={8}>
							<TextFieldWrapper
								typo
								name="CalData"
								label="單號名稱"
								fullWidth
								required
								rules={{
									required: "單號名稱為必填",
								}}
								readOnly={!editing}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									label="編輯人員"
									name="employee"
									required
									rules={{
										required: "編輯人員為必填",
									}}
									virtualize
									disableClearable
								/>
							</OptionPickerProvider>
						</Grid>
					</Grid>
					<Box py={1}>
						<D07ProdGridContainer />
					</Box>
				</FormBox>
			)}
		</form>
	);
});

D07DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRstDateChanged: PropTypes.func,
};

D07DialogForm.displayName = "D07DialogForm";
export default D07DialogForm;
