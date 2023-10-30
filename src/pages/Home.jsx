import HomeFrameBanner from "@/components/home/HomeFrameBanner";
import BulletinWidgetContainer from "@/components/home/widgets/BulletinWidgetContainer";
import Colors from "@/modules/Colors";
import { CopyrightContainer } from "@/shared-components/CopyrightContainer";
import FlexBox from "@/shared-components/FlexBox";
import ModuleHeading from "@/shared-components/ModuleHeading";
import CampaignIcon from "@mui/icons-material/Campaign";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import Styles from "../modules/md-styles";

const Home = memo((props) => {
	const { theme, drawerOpen } = props;
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);
	return (
		<Box pl={0} pt={1}>
			<HomeFrameBanner />

			<Container maxWidth="xl">
				<Box sx={boxStyles}>
					<Grid container spacing={3}>
						<Grid item xl={3} lg={5} md={6} sm={12} xs={12}>
							<BulletinWidgetContainer
								// height={widgetHeight}
								heading={
									<ModuleHeading
										icon={CampaignIcon}
										text="公告"
										cssColor={Colors.HEADING}
									/>
								}></BulletinWidgetContainer>
						</Grid>
						{/* 待辦案件 */}
						<Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
							<BulletinWidgetContainer
								// height={widgetHeight}
								heading={
									<ModuleHeading
										icon={InboxIcon}
										text="待審核"
										cssColor={Colors.HEADING}
									/>
								}
								// children={`* [系統使用者操作手冊](https://cyey.nat.gov.tw/download/%E7%9B%A3%E5%AF%9F%E6%A1%88%E4%BB%B6%E7%AE%A1%E7%90%86%E8%B3%87%E8%A8%8A%E7%B3%BB%E7%B5%B1%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8A.pdf)`}
								// children={MdMessages.POST_DOWNLOAD}
							/>
						</Grid>
						<Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
							<BulletinWidgetContainer
								// height={widgetHeight}
								heading={
									<ModuleHeading
										icon={CloudDownloadIcon}
										text="資料下載區"
										cssColor={Colors.HEADING}
									/>
								}
								// children={`* [系統使用者操作手冊](https://cyey.nat.gov.tw/download/%E7%9B%A3%E5%AF%9F%E6%A1%88%E4%BB%B6%E7%AE%A1%E7%90%86%E8%B3%87%E8%A8%8A%E7%B3%BB%E7%B5%B1%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8A.pdf)`}
								// children={MdMessages.POST_DOWNLOAD}
							/>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<FlexBox fullWidth mt={1} px={2} justifyContent="flex-end">
				<CopyrightContainer />
			</FlexBox>
		</Box>
	);
});

Home.displayName = "Home";
Home.propTypes = {
	theme: PropTypes.object,
	drawerOpen: PropTypes.bool,
};
export default Home;
