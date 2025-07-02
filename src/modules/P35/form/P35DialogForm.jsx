import { Box, Grid, InputAdornment } from "@mui/material";
import { memo } from "react";

import BankPicker from "@/components/BankPicker/BankPicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";

import CmsAreaPicker from "@/components/CmsAreaPicker/CmsAreaPicker";
import CmsCityPicker from "@/components/CmsCityPicker/CmsCityPicker";
import { CheckboxEx, FormLabelEx, TextFieldEx } from "@/shared-components";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import P35GridContainer from "../grid/P35GridContainer";

const P35DialogForm = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		editing,
		updating,
		slotProps,
		onCityChange,
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
					{/* <FormSectionTitle>基本資料</FormSectionTitle> */}
					<FormSectionBox >
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="TrvID"
									label="旅行社代碼"
									autoFocus
									fullWidth
									value={data?.TrvID}
									required
									rules={{ required: "旅行社代碼為必填" }}
									readOnly={updating}
									slotProps={{
										htmlInput: {
											maxLength: 6
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="TrvData"
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
									name="AbbrID"
									label="簡碼"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={2}>
								<CmsCityPicker
									typo
									name="city"
									onChange={onCityChange}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3} lg={2}>
								<CmsAreaPicker
									typo
									name="area"
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3} lg={2}>
								<TextFieldWrapper
									typo
									name="Contact"
									label="聯絡人"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={5} lg={3}>
								<TextFieldWrapper
									typo
									name="Tel"
									label="聯絡電話"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3} lg={3}>
								<TextFieldWrapper
									typo
									name="Fax"
									label="傳真"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3} lg={2}>
								<TextFieldWrapper
									typo
									name="Cel"
									label="行動電話"
									fullWidth
									slotProps={{
										htmlInput: {
											maxLength: 16
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={5} lg={3}>
								<TextFieldWrapper
									typo
									name="Email"
									label="電子信箱"
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
									name="Postal"
									label="郵遞區號"
									fullWidth
									slotProps={{
										htmlInput: {
											maxLength: 5
										}
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={6} lg={4}>
								<TextFieldWrapper
									typo
									name="Addr"
									label="聯絡地址"
									fullWidth
								// slotProps={{
								// 	htmlInput: {
								// 		maxLength: 2
								// 	}
								// }}
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={3} lg={2}>
								<TextFieldWrapper
									typo
									name="Uniform"
									label="公司統一編號"
									fullWidth
									slotProps={{
										htmlInput: {
											maxLength: 8
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={3}>
								<TextFieldWrapper
									typo
									name="InvTitle"
									label="發票抬頭"
									fullWidth
								// slotProps={{
								// 	htmlInput: {
								// 		maxLength: 2
								// 	}
								// }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4.5} lg={3}>
								<BankPicker
									typo
									name="bank"
									label="銀行"
									fullWidth
									disableOpenOnInput
									selectOnFocus
								// slotProps={{
								// 	paper: {
								// 		sx: {
								// 			width: 260,
								// 		},
								// 	},
								// }}
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={3} lg={4}>
								<TextFieldWrapper
									typo
									name="BankAcct"
									label="帳號"
									fullWidth
									slotProps={{
										htmlInput: {
											maxLength: 20
										}
									}}
								/>
							</Grid>

							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									name="Remark"
									multiline
									minRows={1}
									label="備註"
									fullWidth
								/>
							</Grid>

						</Grid>
						<hr />
						<Grid container columns={12} spacing={1}>
							<Grid item xs={1.5}>
								<CheckboxEx
									typo
									variant="outlined"
									fullWidth
									// shrink
									label="簽約"
									name="Assign"
									defaultValue={false}
									size="small"
									slotProps={{
										label: {
											// labelPlacement: "start",
											slotProps: {
												typography: {
													variant: "subtitle2"
												}
											}
										},
									}}
								/>
							</Grid>
							<Grid item xs={10.5}>
								<TextFieldWrapper
									typo
									name="AsRemark"
									multiline
									minRows={1}
									label="簽約備註"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />

							<Grid item xs={12} sm={12} md={3} lg={2}>
								<TextFieldWrapper
									typo
									name="Bonus1"
									label="獎勵金"
									fullWidth
									endAdornment={<InputAdornment position="end">kg</InputAdornment>}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3} lg={2}>
								<TextFieldWrapper
									typo
									name="Bonus2"
									label="獎勵佣金"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3} lg={2}>
								<TextFieldWrapper
									typo
									name="CmsDn"
									label="金額下限"
									fullWidth
								/>
							</Grid>
						</Grid>

						<Box mt={0.5}>
							<Grid container spacing={2}>
								<Grid item xs={12} lg={8}>
									{/* <FormLabelEx variant="subtitle2">佣金設定</FormLabelEx> */}
									<FlexBox inline >
										<FlexBox sx={{ width: "360px" }} />
										<FlexBox sx={{ width: "128px" }} >
											<CheckboxEx
												typo
												// variant="outlined"
												fullWidth
												// shrink
												label="現結"
												name="clearOnSite1"
												defaultValue={false}
												size="small"
												slotProps={{
													label: {
														slotProps: {
															typography: {
																variant: "subtitle2"
															}
														},
														inline: true
													},
												}}
											/>
										</FlexBox>
										<FlexBox sx={{ width: "128px" }} >
											<CheckboxEx
												typo
												// variant="outlined"
												fullWidth
												// shrink
												label="現結"
												name="clearOnSite2"
												defaultValue={false}
												size="small"
												slotProps={{
													label: {
														slotProps: {
															typography: {
																variant: "subtitle2"
															}
														},
														inline: true
													},

												}}
											/>
										</FlexBox>
										<FlexBox sx={{ width: "128px" }} >
											<CheckboxEx
												typo
												// variant="outlined"
												fullWidth
												// shrink
												label="現結"
												name="clearOnSite3"
												defaultValue={false}
												size="small"
												slotProps={{
													label: {
														// labelPlacement: "start",
														slotProps: {
															typography: {
																variant: "subtitle2"
															}
														},
														inline: true
													},
												}}
											/>
										</FlexBox>
									</FlexBox>
									<P35GridContainer />
								</Grid>
								<Grid item xs={12} lg={4}>
									<Box mt={4.6}>
										<Grid container spacing={1}>
											<Grid item xs={8}>
												<TextFieldEx
													typo
													name="guideAmt"
													label="導遊佣金"
													fullWidth
													clearable
												/>
											</Grid>
											<Grid item xs={4}>
												<CheckboxEx
													typo
													label="X 車數"
													name="guideAmtMultipliedByBus"
													variant="outlined"
												/>
											</Grid>
											<Grid item xs={8}>
												<TextFieldEx
													typo
													name="driverAmt"
													label="司機佣金"
													fullWidth
													clearable
												/>
											</Grid>
											<Grid item xs={4}>
												<CheckboxEx
													typo
													label="X 車數"
													name="driverAmtMultipliedByBus"
													variant="outlined"
												/>
											</Grid>
										</Grid>
									</Box>
								</Grid>
							</Grid>

						</Box>
					</FormSectionBox>
				</FormBox>
			)}
		</form>
	);
});

P35DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
	slotProps: PropTypes.object,
	onCityChange: PropTypes.func
};

P35DialogForm.displayName = "P35Form";
export default P35DialogForm;


