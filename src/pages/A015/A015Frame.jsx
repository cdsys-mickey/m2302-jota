import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A015GridContainer } from "../../components/modules/A015/A015GridContainer";
import { ProdGridFormContainer } from "../../components/modules/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../components/modules/prod-grid/ProdGridToolbar";

const A015Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Container maxWidth="md">
				<Box>
					<ProdGridFormContainer safeQty />
				</Box>
			</Container>
			<Box>
				<ProdGridToolbar />
				<A015GridContainer />
			</Box>
		</Box>
	);
});

A015Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A015Frame.displayName = "A015Frame";
export default A015Frame;
