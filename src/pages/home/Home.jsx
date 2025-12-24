import { ReviewWidgetContainer } from "@/components/home/widgets/review/ReviewWidgetContainer";
// import BackgroundImage from "@/images/v748-toon-103-bright-20-1920.png";
import BackgroundImage from "@/images/Cubes.png";
import { FrameBanner, HomeBox } from "@/shared-components";
import { CopyrightContainer } from "@/shared-components/CopyrightContainer";
import { FlexBox } from "shared-components";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const Home = memo((props) => {
	const { title = "首頁", ...rest } = props;
	return (
		<Box sx={{
			backgroundImage: `url(${BackgroundImage})`,
			backgroundSize: "cover",

			backgroundRepeat: "no-repeat",
			minHeight: "100vh",
		}}>
			<HomeBox {...rest}>
				{/* <HomeFrameBanner /> */}
				<FrameBanner title={title} />
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
			</HomeBox>
			<FlexBox fullWidth mt={1} px={2} justifyContent="flex-end">
				<CopyrightContainer />
			</FlexBox>
		</Box>
	);
});

Home.displayName = "Home";
Home.propTypes = {
	drawerOpen: PropTypes.bool,
};
export default Home;
