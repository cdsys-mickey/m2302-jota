import EmployeePicker from "@/components/picker/EmployeePicker";
import ProdPicker from "@/components/picker/ProdPicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { B032QuoteGridContainer } from "./quotes/B032QuoteGridContainer";

const B032DialogForm = memo((props) => {
	const {
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleProdChange,
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
			{readError && <FormErrorBox error={readError} {...slotProps?.error} />}
			{itemDataReady && (
				<>
					<FormBox pt={1}>
						<Grid container columns={24} spacing={1}>

							<Grid item xs={24} sm={24} md={6}>
								<ProdPicker
									autoFocus
									typo
									label="貨品編號"
									name="prod"
									required
									rules={{
										required: "貨品為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
									// disableClearable
									withPrice
									disabled={!creating}
									onChange={handleProdChange}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={5}>
								<FormFieldLabel name="Price" label="建議售價" />
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
								<B032QuoteGridContainer />
							</Grid>
						</Grid>
					</FormBox>

				</>
			)}
		</>
	);
});

B032DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	slotProps: PropTypes.object,
};

B032DialogForm.displayName = "B032DialogForm";
export default B032DialogForm;



