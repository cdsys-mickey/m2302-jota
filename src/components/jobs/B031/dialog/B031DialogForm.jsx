import CustomerPicker from "@/components/picker/CustomerPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { B031QuoteGridContainer } from "./quotes/B031QuoteGridContainer";

const B031DialogForm = memo((props) => {
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

							<Grid item xs={24} sm={24} md={8}>
								<CustomerPicker
									autoFocus
									forNew
									typo
									label="客戶代碼"
									name="customer"
									required
									rules={{
										required: "廠商為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
									// disableClearable
									disabled={!creating}
								/>
							</Grid>

							<Grid item xs={24} sm={24} md={6}>
								<EmployeePicker
									typo
									label="報價人員"
									name="employee"
									required
									rules={{
										required: "詢價人員為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
									// disableClearable
									disabled={!creating}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={5}>
								<DatePickerWrapper
									typo
									name="Date"
									label="報價日期"
									fullWidth
									required
									variant="outlined"
									disabled={!creating}
									validate
								/>
							</Grid>
							<Grid item xs={24}>
								<B031QuoteGridContainer />
							</Grid>
						</Grid>
					</FormBox>

				</>
			)}
		</>
	);
});

B031DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	slotProps: PropTypes.object,
};

B031DialogForm.displayName = "B031DialogForm";
export default B031DialogForm;


