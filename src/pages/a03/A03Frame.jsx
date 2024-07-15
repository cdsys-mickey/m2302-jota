import A03Toolbar from "@/components/jobs/A03/A03Toolbar";
import { CatLGridContainer } from "@/components/jobs/A03/CatLGridContainer";
import { CatMGridContainer } from "@/components/jobs/A03/CatMGridContainer";
import { CatSGridContainer } from "@/components/jobs/A03/CatSGridContainer";
import CatLGridProvider from "@/contexts/A03/CatLGridProvider";
import CatMGridProvider from "@/contexts/A03/CatMGridProvider";
import CatSGridProvider from "@/contexts/A03/CatSGridProvider";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ContainerEx from "../../shared-components/ContainerEx";

const A03Frame = memo((props) => {
	const { drawerOpen, boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<A03Toolbar />
			<ContainerEx maxWidth="lg" alignLeft>
				<Grid container spacing={1}>
					<CatSGridProvider>
						<CatMGridProvider>
							<Grid item xs={12} sm={6} md={4}>
								<CatLGridProvider>
									<CatLGridContainer />
								</CatLGridProvider>
							</Grid>
							<Grid item xs={12} sm={6} md={4}>
								<CatMGridContainer />
							</Grid>
						</CatMGridProvider>
						<Grid item xs={12} sm={6} md={4}>
							<CatSGridContainer />
						</Grid>
					</CatSGridProvider>
				</Grid>
			</ContainerEx>
		</Box>
	);
});

A03Frame.propTypes = {
	drawerOpen: PropTypes.bool,
};

A03Frame.displayName = "A03Frame";
export default A03Frame;
