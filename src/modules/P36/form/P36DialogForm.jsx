import { Box, Grid, InputAdornment } from "@mui/material";
import { memo } from "react";

import BankPicker from "@/components/BankPicker/BankPicker";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";

import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import TaxExcludedCheckbox from "@/components/checkbox/TaxExcludedCheckbox";
import { CheckboxEx, DatePickerEx } from "@/shared-components";

const P36DialogForm = memo((props) => {
	const {
		data,
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
					<FormSectionBox >
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="CndID"
									label="導遊代碼"
									autoFocus
									fullWidth
									value={data?.CndID}
									required
									rules={{ required: "導遊代碼為必填" }}
									readOnly={updating}
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
									name="CndData"
									label="姓名"
									autoFocus={updating}
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

							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="LicNo"
									label="導遊證號"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="IDNo"
									label="身份証號"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<DatePickerEx
									typo
									name="BDay"
									label="生日"
									fullWidth
									clearable
									validate
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={5} lg={3}>
								<TextFieldWrapper
									typo
									name="Cel"
									label="行動電話"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={5}>
								<TextFieldWrapper
									typo
									name="Email"
									label="電子信箱"
									fullWidth
								/>
							</Grid>
							<FlexBox fullWidth />
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

							<Grid item xs={12} sm={12} md={6} lg={9}>
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

						<Box component="hr" my={2} />

						<Grid container spacing={1}>
							<Grid item xs={2}>
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
							<Grid item xs={10}>
								<TextFieldWrapper
									typo
									name="AsRemark"
									multiline
									minRows={1}
									label="簽約備註"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3} lg={2}>
								<TextFieldWrapper
									typo
									name="Bound"
									label="獎勵金百分比"
									fullWidth
									slotProps={{
										htmlInput: {
											maxLength: 8
										}
									}}
									size="small"
									InputProps={{
										endAdornment: <InputAdornment position="end">%</InputAdornment>,
									}}
									inputProps={{
										style: {
											textAlign: 'right',
											// width: '6em', 
										},
										inputMode: 'numeric',
										pattern: '[0-9]*',
									}}
								/>
							</Grid>
						</Grid>

					</FormSectionBox>
				</FormBox>
			)}
		</form>
	);
});

P36DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
	slotProps: PropTypes.object,
};

P36DialogForm.displayName = "P36Form";
export default P36DialogForm;



