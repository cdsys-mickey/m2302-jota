import { CatLGridContainer } from "@/components/modules/a03/CatLGridContainer";
import { Box, Grid, useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import A03Toolbar from "../../components/modules/a03/A03Toolbar";
import { FrameBannerContainer } from "../../shared-components/protected-page/FrameBannerContainer";
import CatLProvider from "../../contexts/a03/CatLProvider";
import Styles from "../../modules/md-styles";
import PropTypes from "prop-types";
import CatMProvider from "../../contexts/a03/CatMProvider";
import { DSGProvider } from "@/shared-contexts/datasheet-grid/DSGProvider";
import { CatMGridContainer } from "../../components/modules/a03/CatMGridContainer";
import CatSProvider from "../../contexts/a03/CatSProvider";
import { CatSGridContainer } from "../../components/modules/a03/CatSGridContainer";

const A03Frame = memo((props) => {
	const { drawerOpen } = props;
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<A03Toolbar />
			<Grid container spacing={1}>
				<DSGProvider id="sm" keyColumn="SClas" otherColumns="ClassData">
					<CatSProvider>
						<DSGProvider
							id="md"
							keyColumn="MClas"
							otherColumns="ClassData">
							<CatMProvider>
								<Grid item xs={12} sm={6} md={4}>
									<DSGProvider
										id="lg"
										keyColumn="LClas"
										otherColumns="ClassData">
										<CatLProvider>
											<CatLGridContainer />
										</CatLProvider>
									</DSGProvider>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<CatMGridContainer />
								</Grid>
							</CatMProvider>
						</DSGProvider>
						<Grid item xs={12} sm={6} md={4}>
							<CatSGridContainer />
						</Grid>
					</CatSProvider>
				</DSGProvider>
			</Grid>
		</Box>
	);
});

A03Frame.propTypes = {
	drawerOpen: PropTypes.bool,
};

A03Frame.displayName = "A03Frame";
export default A03Frame;
