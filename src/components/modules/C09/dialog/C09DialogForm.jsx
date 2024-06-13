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
import { C09ProdGridBottomToolbar } from "./prod-grid/C09ProdGridBottomToolbar";
import { C09ProdGridContainer } from "./prod-grid/C09ProdGridContainer";

const C09DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		readWorking,
		itemDataReady,
		editing,
		handleTxoOrdersChanged,
		handleTxoDeptChanged,
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
						<Grid item xs={24} sm={24} md={3}>
							<TextFieldWrapper
								typo
								name="TxiID"
								label="撥入單號"
								autoFocus
								fullWidth
								// required
								readOnly={true}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<DatePickerWrapper
								typo
								name="txiDate"
								label="撥入日期"
								autoFocus
								fullWidth
								required
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									label="驗收人員"
									name="employee"
									required
									rules={{
										required: "驗收人員為必填",
									}}
									virtualize
									disableClearable
								/>
							</OptionPickerProvider>
						</Grid>

						<FlexBox fullWidth />
						<Grid item xs={24} sm={24} md={12}>
							<TxoOrderPicker
								typo
								name="txoOrder"
								label="撥出單號"
								// virtualize
								fadeOutDisabled
								onChanged={handleTxoOrdersChanged}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<DeptPickerContainer
								typo
								name="txoDept"
								label="撥出門市"
								excludesSelf
								required
								rules={{
									required: "撥出門市為必填",
								}}
								onChange={handleTxoDeptChanged}
								// disabled={txoDeptDisabled}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={7}>
							<DepOrderPicker
								typo
								multiple
								name="depOrders"
								label="訂貨單號"
								// virtualize
								// fadeOutDisabled
								disabled
							/>
						</Grid>
					</Grid>
					<Box py={1}>
						<C09ProdGridContainer />
					</Box>
					<C09ProdGridBottomToolbar />
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

C09DialogForm.propTypes = {
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

C09DialogForm.displayName = "C09DialogForm";
export default C09DialogForm;
