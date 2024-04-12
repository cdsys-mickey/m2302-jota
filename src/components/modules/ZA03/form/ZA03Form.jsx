import { Box, Container, Grid, Tab } from "@mui/material";
import { memo } from "react";

import AppDeptPicker from "@/components/fields/AppDeptPicker";
import AuthScopePickerContainer from "@/components/fields/AuthScopePickerContainer";
import Users from "@/modules/md-users";
import AlertEx from "@/shared-components/AlertEx";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PropTypes from "prop-types";
import { TextFieldWrapper } from "../../../../shared-components/text-field/TextFieldWrapper";
import { ZA03DialogTitleButtonsContainer } from "../dialog/buttons/ZA03DialogTitleButtonsContainer";
import ZA03GridContainer from "./auth/ZA03GridContainer";

const ZA03Form = memo((props) => {
	const {
		readError,
		data,
		readWorking,
		dataLoaded,
		editing,
		updating,
		//TAB
		selectedTab,
		handleTabChange,
		infoDisabled,
		authDisabled,
		deptDisabled,
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
			{readError && (
				<Box pt="20%">
					<AlertEx
						variant="filled"
						title="讀取失敗"
						error={readError}
					/>
				</Box>
			)}
			{dataLoaded && (
				<Box
					// pt={1}
					sx={() => ({
						"& .MuiInputLabel-root": {
							fontSize: "105%",
							// fontWeight: 500,
							// color: "rgba(0, 0, 0, 0.8 )",
						},
						"& .MuiInputLabel-shrink": {
							fontSize: "110%",
							fontWeight: 600,
							left: "-2px",
							// top: "-1px",
							// color: theme.palette.primary.main,
						},
					})}>
					<TabContext value={selectedTab}>
						<Box
							sx={{
								borderBottom: 1,
								borderColor: "divider",
							}}>
							<Grid container>
								<FlexGrid item xs={4}>
									<TabList
										onChange={handleTabChange}
										aria-label="lab API tabs example">
										<Tab
											label="基本資料"
											value={Users.Tabs.INFO}
											disabled={infoDisabled}
										/>
										<Tab
											label="功能權限"
											value={Users.Tabs.AUTH}
											disabled={authDisabled}
										/>
									</TabList>
								</FlexGrid>
								<FlexGrid
									item
									xs={8}
									pr={3}
									justifyContent="flex-end"
									alignItems="center">
									<ZA03DialogTitleButtonsContainer />
								</FlexGrid>
							</Grid>
						</Box>

						<TabPanel value={Users.Tabs.INFO}>
							{/* <FormSectionTitle>基本資料</FormSectionTitle> */}
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
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
										<TextFieldWrapper
											typo
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
										<TextFieldWrapper
											typo
											name="Tel"
											label="辦公室電話"
											fullWidth
										/>
									</Grid>
									<Grid item xs={12} sm={12} md={3}>
										<TextFieldWrapper
											typo
											name="Cel"
											label="手機號碼"
											fullWidth
										/>
									</Grid>
									<FlexBox fullWidth />
									<Grid item xs={12} sm={12} md={5}>
										<TextFieldWrapper
											typo
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
						<TabPanel
							value={Users.Tabs.AUTH}
							sx={{
								paddingBottom: 0,
								paddingLeft: 1,
								paddingRight: 1,
							}}>
							{/* 權限 */}
							{/* <FormSectionTitle>權限</FormSectionTitle> */}
							<FormSectionBox py={editing ? 2 : 1}>
								<ZA03GridContainer />
							</FormSectionBox>
						</TabPanel>
					</TabContext>
				</Box>
			)}
		</form>
	);
});

ZA03Form.propTypes = {
	data: PropTypes.object,
	readError: PropTypes.object,
	readWorking: PropTypes.bool,
	dataLoaded: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	infoDisabled: PropTypes.bool,
	authDisabled: PropTypes.bool,
	deptDisabled: PropTypes.bool,
	selectedTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	handleTabChange: PropTypes.func,
};

ZA03Form.displayName = "ZA03Form";
export default ZA03Form;
