import { Box, Grid } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import TypoTextFieldContainer from "@/shared-components/typo/TypoTextFieldContainer";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import TypoEmployeePickerContainer from "./fields/TypoEmployeePickerContainer";
import { TypoCheckboxExContainer } from "../../../../shared-components/typo/TypoCheckboxExContainer";
import YesNo from "../../../../modules/md-yes-no";
import { TypoCustomerLevelPickerContainer } from "./fields/TypoCustomerLevelPickerContainer";
import TypoChannelPickerContainer from "./fields/TypoChannelPickerContainer";
import TypoAreaPickerContainer from "./fields/TypoAreaPickerContainer";
import TypoPaymentPickerContainer from "./fields/TypoPaymentPickerContainer";
import TypoBankPickerContainer from "../../../fields/TypoBankPickerContainer";
import TypoTransportPickerContainer from "./fields/TypoTransportPickerContainer";

const A06Form = memo((props) => {
	const { data, readWorking, dataLoaded, editing, updating, ...rest } = props;
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
			{dataLoaded && (
				<Box
					pt={1}
					sx={() => ({
						"& .MuiInputLabel-root": {
							fontSize: "106%",
							// fontWeight: 500,
							// color: "rgba(0, 0, 0, 0.8 )",
						},
						"& .MuiInputLabel-shrink": {
							fontSize: "120%",
							fontWeight: 600,
							left: "-2px",
							// color: theme.palette.primary.main,
						},
					})}>
					<FormSectionTitle>基本資料</FormSectionTitle>
					<FormSectionBox py={editing ? 2 : 1} mb={2}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									name="CustID"
									label="客戶代碼"
									autoFocus
									fullWidth
									value={data?.CustID}
									required
									rules={{ required: "客戶代碼為必填" }}
									readOnly={updating}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TypoTextFieldContainer
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
								<TypoTextFieldContainer
									name="AbbrName"
									label="簡稱"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3}>
								<TypoEmployeePickerContainer
									name="employee"
									label="業務員"
									fullWidth
								/>
							</Grid>
							<Grid item xs={4} sm={4} md={2}>
								<TypoCheckboxExContainer
									label="稅外加"
									defaultValue="N"
									name="TaxType"
									valueToChecked={YesNo.valueToChecked}
									checkedToValue={YesNo.checkedToValue}>
									{YesNo.getOptionLabel(data?.TaxType)}
								</TypoCheckboxExContainer>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={2}>
								<TypoCustomerLevelPickerContainer
									name="level"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TypoAreaPickerContainer
									name="area"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TypoChannelPickerContainer
									name="channel"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
						</Grid>
					</FormSectionBox>
					<FormSectionBox py={editing ? 2 : 1} mb={2}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									name="RecGroup"
									label="收帳組別"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoPaymentPickerContainer
									name="payment"
									label="收款方式"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoBankPickerContainer
									name="bank"
									label="銀行"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									name="BankAcct"
									label="帳號"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox py={editing ? 2 : 1} mb={2}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
							<Grid item xs={12} sm={12} md={6}>
								<TypoTextFieldContainer
									name="Boss"
									label="負責人"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									name="Contact"
									label="聯絡人"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									name="UniForm"
									label="統編"
									fullWidth
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									name="CompTel"
									label="電話"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TypoTextFieldContainer
									name="CompFax"
									label="傳真"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TypoTextFieldContainer
									name="Cel"
									label="行動"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionTitle>出貨</FormSectionTitle>
					<FormSectionBox py={editing ? 2 : 1} mb={2}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
							<Grid item xs={12} sm={12} md={8}>
								<TypoTextFieldContainer
									name="RecAddr"
									label="送貨地址"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TypoTextFieldContainer
									name="RecTel"
									label="送貨電話"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={8}>
								<TypoTextFieldContainer
									name="InvAddr"
									label="發票地址"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TypoTextFieldContainer
									name="InvTel"
									label="發票電話"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={4}>
								<TypoTransportPickerContainer
									name="transport"
									label="貨運類別"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox py={editing ? 2 : 1} mb={2}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
							<Grid item xs={12} sm={12} md={6}>
								<TypoTextFieldContainer
									name="mainProd"
									multiline
									minRows={2}
									label="主要產品"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TypoTextFieldContainer
									name="remark"
									multiline
									minRows={2}
									label="備註"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
				</Box>
			)}
		</form>
	);
});

A06Form.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	dataLoaded: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
};

A06Form.displayName = "A06Form";
export default A06Form;