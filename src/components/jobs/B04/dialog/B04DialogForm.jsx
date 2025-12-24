import EmployeePicker from "@/components/picker/EmployeePicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import { FlexBox } from "shared-components";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { B04QuoteGridContainer } from "./quotes/B04QuoteGridContainer";
const B04DialogForm = memo((props) => {
	const {
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
				<>
					<FormBox pt={1}>
						<Grid container columns={24} spacing={1}>
							{!creating && (
								<Grid item xs={24} sm={24} md={5}>
									<TextFieldWrapper
										typo
										name="InqID"
										label="詢價單號"
										// autoFocus
										fullWidth
										required
										readOnly
									/>
								</Grid>
							)}
							<Grid item xs={24} sm={24} md={5}>
								<DatePickerWrapper
									typo
									name="InqDate"
									variant="outlined"
									label="詢價日期"
									{...(editing && {
										autoFocus: true
									})}
									fullWidth
									required
									validate
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={6}>
								<EmployeePicker
									typo
									label="詢價人員"
									name="employee"
									required
									rules={{
										required: "詢價人員為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
								// disableClearable
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={8}>
								<SupplierPicker
									typo
									label="廠商代碼"
									name="supplier"
									required
									rules={{
										required: "廠商為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
								// disableClearable
								/>
							</Grid>

							<Grid item xs={24}>
								<B04QuoteGridContainer />
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

				</>
			)}
		</>
	);
});

B04DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	slotProps: PropTypes.object,
};

B04DialogForm.displayName = "B04DialogForm";
export default B04DialogForm;



