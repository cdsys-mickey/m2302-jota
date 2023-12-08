import A03Toolbar from "@/components/modules/a03/A03Toolbar";
import { CatLGridContainer } from "@/components/modules/a03/CatLGridContainer";
import { CatMGridContainer } from "@/components/modules/a03/CatMGridContainer";
import { CatSGridContainer } from "@/components/modules/a03/CatSGridContainer";
import CatLProvider from "@/contexts/a03/CatLProvider";
import CatMProvider from "@/contexts/a03/CatMProvider";
import CatSProvider from "@/contexts/a03/CatSProvider";
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
				<CatSProvider>
					{/* <DSGProvider
							id="md"
							keyColumn="MClas"
							otherColumns="ClassData"> */}
					<CatMProvider>
						<Grid item xs={12} sm={6} md={4}>
							{/* <DSGProvider
										id="lg"
										keyColumn="LClas"
										otherColumns="ClassData"> */}
							<CatLProvider>
								<CatLGridContainer />
							</CatLProvider>
							{/* </DSGProvider> */}
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<CatMGridContainer />
						</Grid>
					</CatMProvider>
					{/* </DSGProvider> */}
					<Grid item xs={12} sm={6} md={4}>
						<CatSGridContainer />
					</Grid>
				</CatSProvider>
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
