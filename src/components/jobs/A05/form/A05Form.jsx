import { Grid } from "@mui/material";
import { memo } from "react";

import BankPicker from "@/components/fields/BankPicker";
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

const A05Form = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		editing,
		updating,
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
			{readError && <FormErrorBox error={readError} />}
			{itemDataReady && (
				<FormBox pt={1}>
					<FormSectionTitle>基本資料</FormSectionTitle>
					<FormSectionBox py={editing ? 2 : 1} mb={2} px={1}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="FactID"
									label="廠商代碼"
									autoFocus
									fullWidth
									value={data?.FactID}
									required
									rules={{ required: "廠商代碼為必填" }}
									readOnly={updating}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="FactData"
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
							<Grid item xs={12} sm={12} md={5}>
								<TextFieldWrapper
									typo
									name="Tel"
									label="電話"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="Uniform"
									label="公司統編"
									fullWidth
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
									componentsProps={{
										paper: {
											sx: {
												width: 260,
											},
										},
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="PayGroup"
									label="應付帳組別"
									fullWidth
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

							<FlexBox fullWidth />
						</Grid>
					</FormSectionBox>
					{/* 公司 */}
					<FormSectionTitle>公司</FormSectionTitle>
					<FormSectionBox py={editing ? 2 : 1} mb={2} px={1}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="CompAddr"
									label="地址"
									fullWidth
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
							<Grid item xs={4} sm={4} md={2}>
								<TaxExcludedCheckbox
									typo
									label="稅外加"
									name="TaxType"
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* 工廠 */}
					<FormSectionTitle>工廠</FormSectionTitle>
					<FormSectionBox py={editing ? 2 : 1} mb={2} px={1}>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="FactAddr"
									label="地址"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="FactTel"
									label="電話"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="FactFax"
									label="傳真"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox py={editing ? 2 : 1} mb={2} px={1}>
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

A05Form.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
};

A05Form.displayName = "A05Form";
export default A05Form;
