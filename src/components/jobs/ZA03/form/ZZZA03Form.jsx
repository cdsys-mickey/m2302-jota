import { Box, Container, Grid, Tab } from "@mui/material";
import { memo } from "react";

import AppDeptPicker from "@/components/fields/AppDeptPicker";
import AuthScopePickerContainer from "@/components/fields/AuthScopePickerContainer";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PropTypes from "prop-types";
import ZA03 from "@/modules/ZA03.mjs";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { ZA03DialogTitleButtonsContainer } from "../dialog/buttons/ZA03DialogTitleButtonsContainer";
import ZA03GridContainer from "./auth/ZA03GridContainer";
import { ZA03DeptsPickerContainer } from "./depts-picker/ZA03DeptsPickerContainer";

const ZZZA03Form = memo((props) => {
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
			{readError && <FormErrorBox error={readError} {...slotProps?.error} />}
			{dataLoaded && (
				<FormBox
				// pt={1}
				>
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
											value={ZA03.Tabs.INFO}
											disabled={infoDisabled}
										/>
										<Tab
											label="功能權限"
											value={ZA03.Tabs.AUTH}
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

						<TabPanel value={ZA03.Tabs.INFO}>
							{/* <FormSectionTitle>基本資料</FormSectionTitle> */}
							<FormSectionBox editing={editing}>
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
											// value={data?.LoginName}
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
										// disabled={deptDisabled}
										// disabled={readOnly}
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
										<ZA03DeptsPickerContainer
											typo
											name="depts"
											label="可登入門市"
											multiple
											typoChip
											required
										/>
									</Grid>
								</Grid>
							</FormSectionBox>
						</TabPanel>
						<TabPanel
							value={ZA03.Tabs.AUTH}
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
				</FormBox>
			)}
		</form>
	);
});

ZZZA03Form.propTypes = {
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
	slotProps: PropTypes.object,
};

ZZZA03Form.displayName = "ZZZA03Form";
export default ZZZA03Form;
