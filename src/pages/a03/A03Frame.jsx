import A03Toolbar from "@/components/modules/A03/A03Toolbar";
import { CatLGridContainer } from "@/components/modules/A03/CatLGridContainer";
import { CatMGridContainer } from "@/components/modules/A03/CatMGridContainer";
import { CatSGridContainer } from "@/components/modules/A03/CatSGridContainer";
import CatLGridProvider from "@/contexts/A03/CatLGridProvider";
import CatMGridProvider from "@/contexts/A03/CatMGridProvider";
import CatSGridProvider from "@/contexts/A03/CatSGridProvider";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A03Frame = memo((props) => {
	const { drawerOpen, boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<A03Toolbar />
			<Grid container spacing={1}>
				{/* <DSGProvider id="sm" keyColumn="SClas" otherColumns="ClassData"> */}
				<CatSGridProvider>
					{/* <DSGProvider
							id="md"
							keyColumn="MClas"
							otherColumns="ClassData"> */}
					<CatMGridProvider>
						<Grid item xs={12} sm={6} md={4}>
							{/* <DSGProvider
										id="lg"
										keyColumn="LClas"
										otherColumns="ClassData"> */}
							<CatLGridProvider>
								<CatLGridContainer />
							</CatLGridProvider>
							{/* </DSGProvider> */}
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<CatMGridContainer />
						</Grid>
					</CatMGridProvider>
					{/* </DSGProvider> */}
					<Grid item xs={12} sm={6} md={4}>
						<CatSGridContainer />
					</Grid>
				</CatSGridProvider>
				{/* </DSGProvider> */}
			</Grid>
		</Box>
	);
});

A03Frame.propTypes = {
	drawerOpen: PropTypes.bool,
};

A03Frame.displayName = "A03Frame";
export default A03Frame;
