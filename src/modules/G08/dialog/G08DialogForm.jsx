import { Grid } from "@mui/material";
import { memo } from "react";

import { FlexBox } from "shared-components";
import LoadingTypography from "@/shared-components/LoadingTypography";

import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import CustomerPicker from "@/components/picker/CustomerPicker";

const G08DialogForm = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		creating,
		editing,
		updating,
		slotProps,
		...rest
	} = props;
	return (
		<form {...rest}>
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
					<FormSectionBox editing={editing}>
						<Grid container columns={12} spacing={1}>
							{!creating && (
								<Grid item xs={12} sm={12} md={6}>
									<TextFieldWrapper
										typo
										name="AdjID"
										label="調整單號"
										fullWidth
										required
										readOnly
									// slotProps={{
									// 	htmlInput: {
									// 		maxLength: 6
									// 	}
									// }}
									/>
								</Grid>
							)}

							<Grid item xs={12} sm={12} md={6}>
								<DatePickerWrapper
									minDate={"2026/01/01"}
									typo
									name="AdjDate"
									label="調整日期"
									{...(editing && {
										autoFocus: true
									})}
									variant="outlined"
									required
									rules={{
										required: "調整日期為必填",
									}}
									fullWidth
									validate
								/>
							</Grid>
							<Grid item xs={12} sm={12} >
								<CustomerPicker
									typo
									name="CustID"
									label="客戶代號"
									size="small"
									required
									rules={{
										required: "客戶代號為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
									slotProps={{
										paper: {
											sx: {
												width: 360,
											},
										},
									}}

								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="AdjAmt"
									label="調整金額"
									type="number"
									fullWidth
									required
									rules={{
										required: "調整金額為必填",
									}}
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									name="RsnData"
									multiline
									minRows={2}
									maxRows={5}
									label="備註"
									fullWidth
								/>
							</Grid>

						</Grid>
					</FormSectionBox>
				</FormBox>
			)}
		</form>
	);
});

G08DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	creating: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
	slotProps: PropTypes.object,
};

G08DialogForm.displayName = "G08DialogForm";
export default G08DialogForm;


