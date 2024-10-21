import AppDeptPicker from "@/components/fields/AppDeptPicker";
import AuthScopePickerContainer from "@/components/fields/AuthScopePickerContainer";
import FlexBox from "@/shared-components/FlexBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { TabPanel } from "@mui/lab";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ZA03 from "@/modules/md-za03";
import ContainerEx from "@/shared-components/ContainerEx";
import { ZA03DeptsPickerContainer } from "../depts-picker/ZA03DeptsPickerContainer";
import Auth from "@/modules/md-auth";
import ZA03DeptPicker from "../depts-picker/ZA03DeptPicker";

const ZA03InfoForm = memo((props) => {
	const { data, creating, updating, editing, handleDeptChange } = props;
	return (
		<TabPanel
			value={ZA03.Tabs.INFO}
			sx={() => ({
				// paddingTop: 0,
				padding: 0,
				"& .MuiInputLabel-root": {
					fontSize: "105%",
				},
				"& .MuiInputLabel-shrink": {
					fontSize: "110%",
					fontWeight: 600,
					left: "-2px",
				},
			})}>
			{/* <FormSectionTitle>基本資料</FormSectionTitle> */}
			{/* <FlexToolbar RightComponent={ZA03InfoToolbarContainer} /> */}
			<ContainerEx maxWidth="sm">
				<FormSectionBox pt={3} pb={4} px={3} mb={2} mt={3}>
					<Grid container columns={12} spacing={editing ? 2 : 2}>
						<Grid item xs={12} sm={12} md={6}>
							<TextFieldWrapper
								typo
								name="LoginName"
								label="帳號"
								{...(creating && {
									autoFocus: true
								})}
								fullWidth
								required
								rules={{ required: "帳號為必填" }}
								readOnly={updating}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<TextFieldWrapper
								typo
								name="UserName"
								{...(updating && {
									autoFocus: true
								})}
								label="姓名"
								fullWidth
								required
								rules={{
									required: "姓名為必填",
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<TextFieldWrapper
								typo
								name="Tel"
								label="辦公室電話"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
							<TextFieldWrapper
								typo
								name="Cel"
								label="手機號碼"
								fullWidth
							/>
						</Grid>
						<FlexBox fullWidth />
						<Grid item xs={12} sm={12} md={6}>
							<TextFieldWrapper
								typo
								name="Email"
								label="電子信箱"
								fullWidth
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={6}>
							<ZA03DeptPicker
								uid={data?.UID}
								typo
								name="dept"
								label="隸屬門市"
								required
								disableOpenOnInput
								scope={Auth.SCOPES.BRANCH_HQ}
							/>
							{/* <ZA03DeptPicker
								uid={data?.UID}
								typo
								name="dept"
								label="隸屬門市"
								required
								disableOpenOnInput
								scope={Auth.SCOPES.BRANCH_HQ}
								onChange={handleDeptChange}
							/> */}

						</Grid>
						{/* <Grid item xs={12} sm={12} md={6}>
							<AuthScopePickerContainer
								typo
								name="userClass"
								label="權限等級"
								required
							/>
						</Grid> */}

						<Grid item xs={12}>
							<ZA03DeptsPickerContainer
								typo
								name="depts"
								label="可登入門市"
								required
							/>
						</Grid>
					</Grid>
				</FormSectionBox>
			</ContainerEx>
		</TabPanel>
	);
});

ZA03InfoForm.propTypes = {
	data: PropTypes.object,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	deptDisabled: PropTypes.bool,
	handleDeptChange: PropTypes.func,
};

ZA03InfoForm.displayName = "ZA03InfoForm";
export default ZA03InfoForm;
