import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A012GridContainer } from "../../components/modules/A012/A012GridContainer";
import { ProdGridFormContainer } from "../../components/modules/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../components/modules/prod-grid/ProdGridToolbar";
import ContainerEx from "../../shared-components/ContainerEx";
import { ProdGridToolbarContainer } from "../../components/modules/prod-grid/ProdGridToolbarContainer";

const A012Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<ContainerEx maxWidth="md" alignLeft>
				<ProdGridFormContainer />
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
				<A012GridContainer />
			</Box>
		</Box>
	);
});

A012Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A012Frame.displayName = "A012Frame";
export default A012Frame;
