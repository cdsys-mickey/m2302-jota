import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A013GridContainer } from "../../components/modules/A013/A013GridContainer";
import { ProdGridFormContainer } from "../../components/modules/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../components/modules/prod-grid/ProdGridToolbar";

const A013Frame = memo((props) => {
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
				<A013GridContainer />
			</Box>
		</Box>
	);
});

A013Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A013Frame.displayName = "A013Frame";
export default A013Frame;
