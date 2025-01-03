import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A014GridContainer } from "../../../components/jobs/A014/A014GridContainer";
import { ProdGridFormContainer } from "../../../components/jobs/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../../components/jobs/prod-grid/ProdGridToolbar";
import ContainerEx from "../../../shared-components/ContainerEx";
import { ProdGridToolbarContainer } from "../../../components/jobs/prod-grid/ProdGridToolbarContainer";

const A014Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<ProdGridFormContainer />
				</Box>
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
				<A014GridContainer />
			</Box>
		</Box>
	);
});

A014Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A014Frame.displayName = "A014Frame";
export default A014Frame;
