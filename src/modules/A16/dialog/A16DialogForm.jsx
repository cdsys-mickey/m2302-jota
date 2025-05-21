import { Grid } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";

import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";

const A16DialogForm = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		creating,
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
					<FormSectionBox editing={editing}>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="DeptID"
									label="門市代碼"
									{...creating && {
										autoFocus: true
									}}
									fullWidth
									value={data?.DeptID}
									required
									rules={{ required: "門市代碼為必填" }}
									readOnly={updating}
									slotProps={{
										htmlInput: {
											maxLength: 6
										}
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TextFieldWrapper
									typo
									name="GroupKey"
									label="鍵值"
									fullWidth
									required
									rules={{ required: "鍵值為必填" }}
									{...updating && {
										autoFocus: true
									}}
									readOnly={updating}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TextFieldWrapper
									typo
									name="Seq"
									label="排序"
									type="number"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<TextFieldWrapper
									typo
									name="AbbrName"
									label="簡稱"
									fullWidth
									required
									rules={{ required: "簡稱為必填" }}
									{...updating && {
										autoFocus: true
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									name="DeptName"
									label="門市名稱"
									fullWidth
									required
									rules={{
										required: "門市名稱為必填",
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									name="Address"
									label="門市地址"
									fullWidth
									multiline
									rows={2}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									name="Tel"
									label="門市電話"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									name="Contact"
									label="聯絡人"
									fullWidth
								/>
							</Grid>

							<FlexBox fullWidth />
							<Grid item xs={12} sm={12} md={12}>
								<CheckboxExWrapper
									typo
									name="headOffice"
									label="總公司"
									fullWidth
								/>
								<CheckboxExWrapper
									typo
									name="flagship"
									label="旗艦店"
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

A16DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	creating: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
	slotProps: PropTypes.object,
};

A16DialogForm.displayName = "A16DialogForm";
export default A16DialogForm;

