import { Box, Grid, Tab } from "@mui/material";
import { memo } from "react";

import Users from "@/modules/md-users";
import FlexBox from "@/shared-components/FlexBox";
import FlexGrid from "@/shared-components/FlexGrid";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { TabContext, TabList } from "@mui/lab";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { ZA03AuthFormContainer } from "./auth/ZA03AuthFormContainer";
import { ZA03InfoFormContainer } from "./info/ZA03InfoFormContainer";
import AlertEx from "../../../../shared-components/AlertEx";

const ZA03DialogContent = memo((props) => {
	const {
		readError,
		readWorking,
		itemDataReady,
		editing,
		updating,
		//TAB
		selectedTab,
		onTabChange,
		infoDisabled,
		authDisabled,
		deptDisabled,
		...rest
	} = props;

	if (readError) {
		return (
			<Box pt="20%">
				<AlertEx variant="filled" title="讀取失敗" error={readError} />
			</Box>
		);
	}

	if (readWorking || !itemDataReady) {
		return (
			<Container maxWidth="xs">
				<FlexBox justifyContent="center" minHeight="30em">
					<LoadingTypography iconSize="lg" variant="h5">
						讀取中...
					</LoadingTypography>
				</FlexBox>
			</Container>
		);
	}

	return (
		<Box
		// pt={1}
		>
			<TabContext value={selectedTab}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: "divider",
					}}>
					<Grid container>
						<FlexGrid item xs={12}>
							<TabList
								onChange={onTabChange}
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
					</Grid>
				</Box>

				<ZA03InfoFormContainer />
				<ZA03AuthFormContainer />
			</TabContext>
		</Box>
	);
});

ZA03DialogContent.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	infoDisabled: PropTypes.bool,
	authDisabled: PropTypes.bool,
	deptDisabled: PropTypes.bool,
	selectedTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onTabChange: PropTypes.func,
	readError: PropTypes.object,
};

ZA03DialogContent.displayName = "ZA03DialogContent";
export default ZA03DialogContent;
