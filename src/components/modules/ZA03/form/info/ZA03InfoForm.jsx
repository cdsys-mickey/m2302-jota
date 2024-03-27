import { memo } from "react";
import PropTypes from "prop-types";
import { TabPanel } from "@mui/lab";
import Users from "@/modules/md-users";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import TypoTextFieldContainer from "@/shared-components/typo/TypoTextFieldContainer";
import FlexBox from "@/shared-components/FlexBox";
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import AuthScopePickerContainer from "@/components/fields/AuthScopePickerContainer";
import ZA03InfoToolbarContainer from "./ZA03InfoToolbarContainer";
import FlexToolbar from "../../../../../shared-components/listview/toolbar/FlexToolbar";

const ZA03InfoForm = memo((props) => {
	const { data, updating, editing, deptDisabled } = props;
	return (
		<TabPanel
			value={Users.Tabs.INFO}
			sx={() => ({
				paddingTop: 0,
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
			<FlexToolbar RightComponent={ZA03InfoToolbarContainer} />

			<FormSectionBox py={editing ? 2 : 1} mb={2}>
				<Grid container columns={12} spacing={editing ? 2 : 1}>
					<Grid item xs={12} sm={12} md={3}>
						<TypoTextFieldContainer
							name="LoginName"
							label="帳號"
							autoFocus
							fullWidth
							value={data?.LoginName}
							required
							rules={{ required: "帳號為必填" }}
							readOnly={updating}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={3}>
						<TypoTextFieldContainer
							name="UserName"
							label="姓名"
							fullWidth
							required
							rules={{
								required: "姓名為必填",
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={3}>
						<TypoTextFieldContainer
							name="Tel"
							label="辦公室電話"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={3}>
						<TypoTextFieldContainer
							name="Cel"
							label="手機號碼"
							fullWidth
						/>
					</Grid>
					<FlexBox fullWidth />
					<Grid item xs={12} sm={12} md={5}>
						<TypoTextFieldContainer
							name="Email"
							label="電子信箱"
							fullWidth
						/>
					</Grid>

					<Grid item xs={12} sm={12} md={4}>
						<AppDeptPicker
							uid={data?.UID}
							typo
							name="dept"
							label="隸屬門市"
							required
							disabled={deptDisabled}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={3}>
						<AuthScopePickerContainer
							typo
							name="userClass"
							label="權限等級"
							required>
							{/* {Auth.getOptionLabel(
												data?.userClass
											)} */}
						</AuthScopePickerContainer>
					</Grid>

					<Grid item xs={12}>
						<AppDeptPicker
							typo
							name="depts"
							label="可登入門市"
							multiple
							chip
							required
						/>
					</Grid>
				</Grid>
			</FormSectionBox>
		</TabPanel>
	);
});

ZA03InfoForm.propTypes = {
	data: PropTypes.object,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	deptDisabled: PropTypes.bool,
};

ZA03InfoForm.displayName = "ZA03InfoForm";
export default ZA03InfoForm;
