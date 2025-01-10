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
import { B012QuoteGridContainer } from "./quotes/B012QuoteGridContainer";

const B012DialogForm = memo((props) => {
	const {
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleProdChange,
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

							<Grid item xs={24} sm={24} md={6}>
								<ProdPicker
									autoFocus
									typo
									label="貨品編號"
									name="dlgProd"
									required
									rules={{
										required: "貨品為必填",
									}}
									virtualize
									disableOpenOnInput
									selectOnFocus
									disableClearable
									withPrice
									disabled={!creating}
									onChange={handleProdChange}
									slotProps={{
										paper: {
											sx: {
												width: 360,
											}
										},
									}}
								/>
							</Grid>
							<Grid item xs={24} sm={24} md={5}>
								<FormFieldLabel name="Price" label="建議售價" />
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
								<B012QuoteGridContainer />
							</Grid>
						</Grid>
					</FormBox>

				</>
			)}
		</>
	);
});

B012DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
};

B012DialogForm.displayName = "B012DialogForm";
export default B012DialogForm;


