import FlexBox from "@/shared-components/FlexBox";
import { Box, FormHelperText, Grid, Typography } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";
import { ZA03CopyAuthUserPicker } from "./ZA03CopyAuthUserPicker";
import { ZA03CopyAuthDeptCheckboxGroupContainer } from "@/components/modules/ZA03/copy-auth/ZA03CopyAuthDeptCheckboxGroupContainer";
import { useScrollable } from "../../../../shared-hooks/useScrollable";

const ZA03CopyAuthForm = memo((props) => {
	const { user } = props;

	if (!user) {
		return false;
	}
	return (
		<FlexBox py={1}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					{/* <FormHelperText>
						*選擇要複製權限給 {user.UserName} 的使用者
					</FormHelperText> */}
					<Typography>
						*選擇要複製權限給 {user.UserName} 的使用者
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<ZA03CopyAuthUserPicker
						label="來源使用者"
						name="fromUser"
						typeToSearchText="以姓名,帳號或信箱搜尋"
					/>
				</Grid>
				<Grid item xs={12}>
					<ZA03CopyAuthDeptCheckboxGroupContainer
						label="可用單位"
						name="depts"
						CheckboxExProps={{
							size: "small",
						}}
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
