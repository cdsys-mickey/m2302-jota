import { Box, Grid } from "@mui/material";
import { memo } from "react";

import TypoBankPickerContainer from "@/components/fields/TypoBankPickerContainer";
import YesNo from "@/modules/md-yes-no";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { TypoCheckboxExContainer } from "@/shared-components/checkbox/TypoCheckboxExContainer";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { TextFieldWrapper } from "../../../../shared-components/text-field/TextFieldWrapper";

const A05Form = memo((props) => {
	const { data, readWorking, itemDataReady, editing, updating, ...rest } =
		props;
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
			{itemDataReady && (
				<Box
					pt={1}
					sx={() => ({
						"& .MuiInputLabel-root": {
							fontSize: "105%",
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
								<TypoBankPickerContainer
									name="bank"
									label="銀行"
									fullWidth
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
					<FormSectionBox py={editing ? 2 : 1} mb={2}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
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
								<TypoCheckboxExContainer
									label="稅外加"
									defaultValue="N"
									name="TaxType"
									valueToChecked={YesNo.valueToChecked}
									checkedToValue={YesNo.checkedToValue}>
									{YesNo.getOptionLabel(data?.TaxType)}
								</TypoCheckboxExContainer>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* 工廠 */}
					<FormSectionTitle>工廠</FormSectionTitle>
					<FormSectionBox py={editing ? 2 : 1} mb={2}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
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
					<FormSectionBox py={editing ? 2 : 1} mb={2}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
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
				</Box>
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
};

A05Form.displayName = "A05Form";
export default A05Form;
