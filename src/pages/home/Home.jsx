import BackgroundImage from "@/images/v748-toon-103-bright-20-1920.png";
import { CopyrightContainer } from "@/shared-components/CopyrightContainer";
import FlexBox from "@/shared-components/FlexBox";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ReviewWidgetContainer } from "@/components/home/widgets/review/ReviewWidgetContainer";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";

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
