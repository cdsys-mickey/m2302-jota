import { Box, Grid, Tab } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import TypoTextFieldContainer from "@/shared-components/typo/TypoTextFieldContainer";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import TypoDeptPickerContainer from "../../../fields/TypoDeptPickerContainer";
import Users from "@/modules/md-users";
import ZA03GridContainer from "./auth/ZA03GridContainer";

const ZA03Form = memo((props) => {
	const {
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
			{dataLoaded && (
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
					<TabContext value={selectedTab}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
						</Box>
						<TabPanel value={Users.Tabs.INFO}>
							{/* <FormSectionTitle>基本資料</FormSectionTitle> */}
							<FormSectionBox py={editing ? 2 : 1} mb={2}>
								<Grid
									container
									columns={12}
									spacing={editing ? 2 : 1}>
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
									<Grid item xs={12} sm={12} md={6}>
										<TypoTextFieldContainer
											name="Email"
											label="電子信箱"
											fullWidth
											// required
											// rules={{
											// 	required: "電子信箱必填",
											// }}
										/>
									</Grid>

									<Grid item xs={12} sm={12} md={6}>
										<TypoDeptPickerContainer
											required
											name="dept"
											disabled={deptDisabled}
											rules={{
												required: "電子信箱必填",
											}}
										/>
									</Grid>
								</Grid>
							</FormSectionBox>
						</TabPanel>
						<TabPanel
							value={Users.Tabs.AUTH}
							sx={{ paddingBottom: 0 }}>
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
	readWorking: PropTypes.bool,
	dataLoaded: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	infoDisabled: PropTypes.bool,
	authDisabled: PropTypes.bool,
	deptDisabled: PropTypes.bool,
	selectedTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	handleTabChange: PropTypes.func,
};

ZA03Form.displayName = "ZA03Form";
export default ZA03Form;
