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
import DeptPickerContainer from "@/components/DeptPickerContainer";
import { DepOrderPicker } from "@/components/dep-order-picker/DepOrderPicker";
import { TxoOrderPicker } from "@/components/txo-order-picker/TxoOrderPicker";
import { D05ProdGridBottomToolbar } from "./prod-grid/D05ProdGridBottomToolbar";
import { D05ProdGridContainer } from "./prod-grid/D05ProdGridContainer";

const D05DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		readWorking,
		itemDataReady,
		editing,
		// txoDeptDisabled,
		remarkDisabled,
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
						<Grid item xs={24} sm={24} md={4}>
							<TextFieldWrapper
								typo
								name="CxlID"
								label="報廢單號"
								autoFocus
								fullWidth
								// required
								readOnly={true}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<DatePickerWrapper
								typo
								name="wdate"
								label="報廢日期"
								autoFocus
								fullWidth
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={6}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									label="倉管人員"
									name="employee"
									required
									rules={{
										required: "倉管人員為必填",
									}}
									virtualize
									disableClearable
								/>
							</OptionPickerProvider>
						</Grid>
					</Grid>
					<Box py={1}>
						<D05ProdGridContainer />
					</Box>
					<D05ProdGridBottomToolbar />
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
								disabled={remarkDisabled}
							/>
						</Grid>
					</Grid>
				</FormBox>
			)}
		</form>
	);
});

D05DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRtnDateChanged: PropTypes.func,
	onSubmit: PropTypes.func,
	editing: PropTypes.bool,
	handleTxoOrdersChanged: PropTypes.func,
	handleTxoDeptChanged: PropTypes.func,
	remarkDisabled: PropTypes.bool,
};

D05DialogForm.displayName = "D05DialogForm";
export default D05DialogForm;