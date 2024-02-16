import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A011GridContainer } from "../../components/modules/A011/A011GridContainer";
import { ProdGridFormContainer } from "../../components/modules/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../components/modules/prod-grid/ProdGridToolbar";
import ContainerEx from "../../shared-components/ContainerEx";

const A011Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<ContainerEx maxWidth="md" alignLeft>
				<ProdGridFormContainer />
			</ContainerEx>
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
