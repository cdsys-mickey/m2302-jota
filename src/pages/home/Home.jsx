import HomeFrameBanner from "@/components/home/HomeFrameBanner";
import BulletinWidgetContainer from "@/components/home/widgets/BulletinWidgetContainer";
import Colors from "@/modules/md-colors";
import { CopyrightContainer } from "@/shared-components/CopyrightContainer";
import FlexBox from "@/shared-components/FlexBox";
import ModuleHeading from "@/shared-components/ModuleHeading";
import CampaignIcon from "@mui/icons-material/Campaign";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import InboxIcon from "@mui/icons-material/Inbox";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import Styles from "@/modules/md-styles";
import { ReviewWidgetContainer } from "../../components/home/widgets/review/ReviewWidgetContainer";
import BackgroundImage from "@/images/v748-toon-103-bright-20-1920.png";
import { FrameBannerContainer } from "../../shared-components/protected-page/FrameBannerContainer";

const Home = memo((props) => {
	const { boxStyles } = props;

	return (
		<>
			<Box
				sx={[
					boxStyles,
					{
						backgroundImage: `url(${BackgroundImage})`,
						backgroundSize: "cover",

						backgroundRepeat: "no-repeat",
						minHeight: "100vh",
					},
				]}>
				{/* <HomeFrameBanner /> */}
				<FrameBannerContainer title="首頁" />
				<Box pt={3}>
					<Grid container spacing={3}>
						{/* <Grid item xl={3} lg={5} md={6} sm={12} xs={12}>
							<BulletinWidgetContainer
								heading={
									<ModuleHeading
										icon={CampaignIcon}
										text="公告"
										cssColor={Colors.HEADING}
									/>
								}
								/>
						</Grid> */}
						{/* 待覆核 */}
						<Grid item xl={3} lg={4} md={6} sm={12} xs={12}>
							<ReviewWidgetContainer />
						</Grid>
					</Grid>
				</Box>
				<FlexBox fullWidth mt={1} px={2} justifyContent="flex-end">
					<CopyrightContainer />
				</FlexBox>
			</Box>
		</>
	);
});

Home.displayName = "Home";
Home.propTypes = {
	theme: PropTypes.object,
	drawerOpen: PropTypes.bool,
};
export default Home;
