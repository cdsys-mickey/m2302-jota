import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A013GridContainer } from "@/components/jobs/A013/A013GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "@/components/jobs/prod-grid/ProdGridToolbar";
import ContainerEx from "@/shared-components/ContainerEx";
import { ProdGridToolbarContainer } from "../../../components/jobs/prod-grid/ProdGridToolbarContainer";

const A22Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<ContainerEx maxWidth="md" alignLeft>
				<ProdGridFormContainer />
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
				<A013GridContainer />
			</Box>
		</Box>
	);
});

A22Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A22Frame.displayName = "A22Frame";
export default A22Frame;
