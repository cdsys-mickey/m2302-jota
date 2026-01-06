import A03Toolbar from "@/components/jobs/A03/A03Toolbar";
import { CatLGridContainer } from "@/components/jobs/A03/CatLGridContainer";
import { CatMGridContainer } from "@/components/jobs/A03/CatMGridContainer";
import { CatSGridContainer } from "@/components/jobs/A03/CatSGridContainer";
import { CatLProvider } from "@/contexts/A03/CatLProvider";
import { CatMProvider } from "@/contexts/A03/CatMProvider";
import { CatSProvider } from "@/contexts/A03/CatSProvider";
import { FrameBanner, FrameBox } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";


const A03Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box mb={0.5}>
				<A03Toolbar />
			</Box>
			<ContainerEx maxWidth="xl" alignLeft>
				<Grid container spacing={1}>
					<CatSProvider>
						{/* <CatSGridProvider> */}
						<CatMProvider>
							{/* <CatMGridProvider> */}
							<Grid item xs={12} sm={12} md={6} lg={4}>
								<CatLProvider>
									<CatLGridContainer />
								</CatLProvider>
							</Grid>
							<Grid item xs={12} sm={12} md={6} lg={4}>
								<CatMGridContainer />
							</Grid>
							{/* </CatMGridProvider> */}
						</CatMProvider>
						<Grid item xs={12} sm={12} md={6} lg={4}>
							<CatSGridContainer />
						</Grid>
						{/* </CatSGridProvider> */}
					</CatSProvider>
				</Grid>
			</ContainerEx>
		</FrameBox>
	);
});

A03Frame.propTypes = {
	drawerOpen: PropTypes.bool,
};

A03Frame.displayName = "A03Frame";
export default A03Frame;
