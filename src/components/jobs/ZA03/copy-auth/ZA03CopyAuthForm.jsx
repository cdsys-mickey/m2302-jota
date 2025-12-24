import { ZA03CopyAuthDeptCheckboxGroupContainer } from "@/components/jobs/ZA03/copy-auth/ZA03CopyAuthDeptCheckboxGroupContainer";
import { FlexBox } from "shared-components";
import { Grid, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ZA03CopyAuthUserPicker } from "./ZA03CopyAuthUserPicker";
import { ZA03OverrideDeptCheckboxContainer } from "./fields/ZA03OverrideDeptCheckboxContainer";

const ZA03CopyAuthForm = memo((props) => {
	const { user } = props;

	if (!user) {
		return false;
	}
	return (
		<FlexBox py={1}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography mb={1}>
						* 選擇要複製權限給「{user.UserName}」的使用者
					</Typography>
					<ZA03CopyAuthUserPicker
						label="來源使用者"
						name="fromUser"
						typeToSearchText="以姓名,帳號或信箱搜尋"
						required
						rules={{
							required: "來源使用者為必填欄位",
						}}
					/>
				</Grid>
				<Grid item xs={7}>
					<ZA03CopyAuthDeptCheckboxGroupContainer
						fullWidth
						label="要複製的單位權限"
						name="depts"
						CheckboxExProps={{
							size: "small",
						}}
					/>
				</Grid>
				<Grid item xs={5}>
					<ZA03OverrideDeptCheckboxContainer
						name="overrideDept"
						label="強制複製到目前單位"
						helperText="(只有當勾選單一單位時才可用)"
					/>
				</Grid>
			</Grid>
			{/* <FormHelperText>
					*點擊選單項目時按住 Ctrl 可進行複選
				</FormHelperText> */}
		</FlexBox>
	);
});

ZA03CopyAuthForm.propTypes = {
	user: PropTypes.object,
};

ZA03CopyAuthForm.displayName = "ZA03CopyAuthForm";
export default ZA03CopyAuthForm;
