import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A011GridContainer } from "../../components/modules/A011/A011GridContainer";
import { ProdGridFormContainer } from "../../components/modules/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../components/modules/prod-grid/ProdGridToolbar";

const A011Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Container maxWidth="md">
				<Box>
					<ProdGridFormContainer />
				</Box>
			</Container>
			<Box>
				<ProdGridToolbar />
				<A011GridContainer />
			</Box>
		</Box>
	);
});

A011Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A011Frame.displayName = "A011Frame";
export default A011Frame;
