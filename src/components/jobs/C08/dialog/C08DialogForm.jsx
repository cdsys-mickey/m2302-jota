import TaxExcludedCheckbox from "@/components/checkbox/TaxExcludedCheckbox";
import { EmployeePicker } from "@/components/picker/EmployeePicker";
import { SupplierIdPickerContainer } from "@/components/picker/SupplierIdPickerContainer";
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
import FlexGrid from "@/shared-components/FlexGrid";
import { C08ProdGridBottomToolbar } from "./prod-grid/C08ProdGridBottomToolbar";
import { C08ProdGridContainer } from "./prod-grid/C08ProdGridContainer";
import DeptPickerContainer from "../../../DeptPickerContainer";
import { DepOrderPicker } from "../../../dep-order-picker/DepOrderPicker";
import TransportTypePicker from "../../../tranport-type-picker/TransportTypePicker";

const C08DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleTxiDeptChanged,
		handleRtnDateChanged,
		txiDeptDisabled,
		handleDepOrdersChanged,
		purchaseOrdersDisabled,
		txiDept,
		...rest
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
								name="TxoID"
								label="撥出單號"
								autoFocus
								fullWidth
								// required
								readOnly={true}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={4}>
							<DatePickerWrapper
								typo
								name="TxoDate"
								label="撥出日期"
								autoFocus
								fullWidth
								required
								variant="outlined"
								onChanged={handleRtnDateChanged}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									label="倉管人員"
									autoFocus
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
						<Grid item xs={24} sm={24} md={5}>
							<DeptPickerContainer
								typo
								name="txiDept"
								label="撥入門市"
								excludesSelf
								required
								rules={{
									required: "撥入門市為必填",
								}}
								onChanged={handleTxiDeptChanged}
							/>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<TransportTypePicker
								typo
								name="transType"
								label="貨運方式"
								required
								rules={{
									required: "貨運方式為必填",
								}}
							/>
						</Grid>
						<FlexBox fullWidth />
						<Grid item xs={24} sm={24} md={13}>
							<DepOrderPicker
								typo
								multiple
								name="depOrders"
								label="訂貨單號"
								// virtualize
								// fadeOutDisabled
								onChanged={handleDepOrdersChanged}
								disabled={purchaseOrdersDisabled || !txiDept}
							/>
						</Grid>

						<Grid item xs={24} sm={24} md={5}>
							<OptionPickerProvider>
								<EmployeePicker
									typo
									label="配送人"
									name="deliveryEmployee"
									virtualize
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={24} md={5}>
							<TextFieldWrapper
								typo
								name="HDNo"
								label="宅配通單號"
								fullWidth
							/>
						</Grid>
					</Grid>
					<Box py={1}>
						<C08ProdGridContainer />
					</Box>
					<C08ProdGridBottomToolbar />
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
							/>
						</Grid>
					</Grid>
				</FormBox>
			)}
		</form>
	);
});

C08DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRtnDateChanged: PropTypes.func,
};

C08DialogForm.displayName = "C08DialogForm";
export default C08DialogForm;