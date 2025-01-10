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
import { B011QuoteGridContainer } from "./quotes/B011QuoteGridContainer";
import CustomerPicker from "@/components/picker/CustomerPicker";
import { useContext } from "react";
import { BContext } from "@/contexts/B/BContext";

const B011DialogForm = memo((props) => {
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
	const b = useContext(BContext);

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

							<Grid item xs={24} sm={24} md={8}>
								<CustomerPicker
									autoFocus
									typo
									forNew={b.forNew}
									label={b.forNew ? "新客戶代碼" : "客戶代碼"}
									name="dlgCustomer"
									required
									rules={{
										required: b.forNew ? "新客戶代碼為必填" : "客戶代碼為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
									disableClearable
									disabled={!creating}
								// slotProps={{
								// 	paper: {
								// 		sx: {
								// 			width: 360,
								// 		},
								// 	},
								// }}
								/>
							</Grid>

							<Grid item xs={24} sm={24} md={6}>
								<EmployeePicker
									typo
									label="報價人員"
									name="dlgEmployee"
									required
									rules={{
										required: "詢價人員為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
									disableClearable
									disabled={!creating}
								/>
							</Grid>
							{creating &&
								<Grid item xs={24} sm={24} md={6}>
									<DatePickerWrapper
										typo
										name="dlgDate"
										label="報價日期"
										fullWidth
										required
										variant="outlined"
										disabled={!creating}
										validate
									/>
								</Grid>
							}


							<Grid item xs={24}>
								<B011QuoteGridContainer />
							</Grid>
						</Grid>
					</FormBox>

				</>
			)}
		</>
	);
});

B011DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
};

B011DialogForm.displayName = "B011DialogForm";
export default B011DialogForm;

