import { Grid } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import TaxExcludedCheckbox from "../../../checkbox/TaxExcludedCheckbox";
import BankPicker from "../../../fields/BankPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import AreaPicker from "./fields/AreaPicker";
import ChannelPicker from "./fields/ChannelPicker";
import PaymentPicker from "./fields/PaymentPicker";
import TransportPicker from "./fields/TransportPicker";
import { CustomerLevelPicker } from "./fields/CustomerLevelPicker";

const A06DialogForm = memo((props) => {
	const {
		readWorking,
		readError,
		itemDataReady,
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
					<FormSectionTitle>基本資料</FormSectionTitle>
					<FormSectionBox pt={editing ? 1.5 : 0.5} pb={1} mb={2} px={1}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="CustID"
									label="客戶代碼"
									autoFocus
									fullWidth
									// value={data?.CustID}
									required
									rules={{ required: "客戶代碼為必填" }}
									readOnly={updating}
									slotProps={{
										htmlInput: {
											maxLength: 8
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="CustData"
									label="名稱"
									fullWidth
									required
									rules={{
										required: "名稱為必填",
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="AbbrName"
									label="簡稱"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3}>
								<EmployeePicker
									typo
									name="employee"
									label="業務員"
									fullWidth
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={2}>
								<TaxExcludedCheckbox
									typo
									label="稅外加"
									name="TaxType"
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3}>
								<CustomerLevelPicker
									typo
									name="level"
									fullWidth
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<AreaPicker
									typo
									name="area"
									fullWidth
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<ChannelPicker
									typo
									name="channel"
									fullWidth
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<FlexBox fullWidth />
						</Grid>
					</FormSectionBox>
					<FormSectionBox pt={editing ? 1.5 : 0.5} pb={1} mb={2} px={1}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="RecGroup"
									label="收帳組別"
									fullWidth
									slotProps={{
										htmlInput: {
											maxLength: 2
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<PaymentPicker
									typo
									name="payment"
									label="收款方式"
									fullWidth
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<BankPicker
									typo
									name="bank"
									label="銀行"
									fullWidth
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="BankAcct"
									label="帳號"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox pt={editing ? 1.5 : 0.5} pb={1} mb={2} px={1}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="Boss"
									label="負責人"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="Contact"
									label="聯絡人"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="UniForm"
									label="統編"
									fullWidth
									slotProps={{
										htmlInput: {
											maxLength: 8
										}
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="CompTel"
									label="電話"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="CompFax"
									label="傳真"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="Cel"
									label="行動"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionTitle>出貨</FormSectionTitle>
					<FormSectionBox pt={editing ? 1.5 : 0.5} pb={1} mb={2} px={1}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={8}>
								<TextFieldWrapper
									typo
									name="RecAddr"
									label="送貨地址"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="RecTel"
									label="送貨電話"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={8}>
								<TextFieldWrapper
									typo
									name="InvAddr"
									label="發票地址"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="InvTel"
									label="發票電話"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3}>
								<TransportPicker
									typo
									name="transport"
									label="貨運類別"
									fullWidth
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox pt={editing ? 1.5 : 0.5} pb={1} mb={2} px={1}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="mainProd"
									multiline
									minRows={2}
									label="主要產品"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="remark"
									multiline
									minRows={2}
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

A06DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
	slotProps: PropTypes.object,
};

A06DialogForm.displayName = "A06Form";
export default A06DialogForm;
