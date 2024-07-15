import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A011GridContainer } from "../../components/jobs/A011/A011GridContainer";
import { ProdGridFormContainer } from "../../components/jobs/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../components/jobs/prod-grid/ProdGridToolbar";
import ContainerEx from "../../shared-components/ContainerEx";
import { ProdGridToolbarContainer } from "../../components/jobs/prod-grid/ProdGridToolbarContainer";

const A011Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<ContainerEx maxWidth="md" alignLeft>
				<ProdGridFormContainer />
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
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
