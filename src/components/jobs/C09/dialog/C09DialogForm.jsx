import DeptPicker from "@/components/picker/DeptPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { PurchaseDepOrderPicker } from "@/components/purchase-dep-order-picker/PurchaseDepOrderPicker";
import { TxoOrderPicker } from "@/components/txo-order-picker/TxoOrderPicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { C09ProdGridBottomToolbar } from "./prod-grid/C09ProdGridBottomToolbar";
import { C09ProdGridContainer } from "./prod-grid/C09ProdGridContainer";

const C09DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		readWorking,
		itemDataReady,
		creating,
		editing,
		handleTxoOrderChanged,
		handleTxoDeptChanged,
		// txoDeptDisabled,
		remarkDisabled,
		slotProps,
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
			{readError && <FormErrorBox error={readError}  {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={editing ? 1 : 0}>
					<Grid container columns={24} spacing={editing ? 1 : 1}>
						{!creating && (<Grid item xs={24} sm={24} md={3}>
							<TextFieldWrapper
								typo
								name="TxiID"
								label="撥入單號"
								autoFocus
								fullWidth
								// required
								readOnly={true}
							/>
						</Grid>)}
						<Grid item xs={24} sm={24} md={4.5}>
							<DatePickerWrapper
								typo
								name="txiDate"
								label="撥入日期"
								autoFocus
								fullWidth
								required
								validate
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<EmployeePicker
								typo
								label="驗收人員"
								name="employee"
								required
								rules={{
									required: "驗收人員為必填",
								}}
								virtualize
								// disableClearable
								disableOpenOnInput
							/>
						</Grid>

						<FlexBox fullWidth />
						<Grid item xs={24} sm={24} md={5.5}>
							<TxoOrderPicker
								typo
								name="txoOrder"
								label="撥出單號"
								// virtualize
								// fadeOutDisabled
								onChanged={handleTxoOrderChanged}
								disableOpenOnInput
								slotProps={{
									paper: {
										sx: {
											width: 700,
										},
									},
								}}
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={7}>
							<PurchaseDepOrderPicker
								typo
								multiple
								name="depOrders"
								label="訂貨單號"
								// virtualize
								// fadeOutDisabled
								disabled
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<DeptPicker
								typo
								name="txoDept"
								label="撥出門市"
								excludesSelf
								required
								rules={{
									required: "撥出門市為必填",
								}}
								onChange={handleTxoDeptChanged}
								disableOpenOnInput
							// disabled={txoDeptDisabled}
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
	creating: PropTypes.bool,
	editing: PropTypes.bool,
	handleTxoOrderChanged: PropTypes.func,
	handleTxoDeptChanged: PropTypes.func,
	remarkDisabled: PropTypes.bool,
	slotProps: PropTypes.object,
};

C09DialogForm.displayName = "C09DialogForm";
export default C09DialogForm;
