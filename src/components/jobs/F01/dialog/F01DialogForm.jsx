import EmployeePicker from "@/components/picker/EmployeePicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Container, Drawer, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { F01QuoteGridContainer } from "./quotes/F01QuoteGridContainer";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";

const F01DialogForm = memo((props) => {
	const {
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
				<>
					<FormBox pt={1}>
						<Grid container columns={24} spacing={1}>
							<Grid item md={5}>
								<TextFieldWrapper
									typo
									name="PhyID"
									label="清單編號"
									autoFocus={creating}
									fullWidth
									disabled={updating}
									required
									rules={{
										required: "清單編號為必填"
									}}
									slotProps={{
										htmlInput: {
											maxLength: 10
										}
									}}
								/>
							</Grid>
							<Grid item md={6}>
								<EmployeePicker
									typo
									label="製單人員"
									name="employee"
									required
									rules={{
										required: "製單人員為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
								// disableClearable
								/>
							</Grid>

							<Grid item md={9}>
								<TextFieldWrapper
									typo
									name="PhyData"
									label="清單名稱"
									fullWidth
									required
									rules={{
										required: "清單名稱為必填",
									}}
									readOnly={updating}
								/>
							</Grid>
							{editing && (
								<Grid item md={4}>
									<CheckboxExWrapper
										typo
										label="貨品排序"
										name="Order"
										size="medium"
									/>
								</Grid>
							)}


							<Grid item xs={24}>
								<F01QuoteGridContainer />
							</Grid>
							<Grid item xs={24}>
								<TextFieldWrapper
									typo
									name="Message_N"
									multiline
									minRows={1}
									maxRows={1}
									label="訊息"
									fullWidth
									editing={false}
								/>
							</Grid>
						</Grid>
					</FormBox>

				</>
			)}
		</>
	);
});

F01DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
};

F01DialogForm.displayName = "F01DialogForm";
export default F01DialogForm;

