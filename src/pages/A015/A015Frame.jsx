import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A015GridContainer } from "../../components/jobs/A015/A015GridContainer";
import { ProdGridFormContainer } from "../../components/jobs/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../components/jobs/prod-grid/ProdGridToolbar";
import ContainerEx from "../../shared-components/ContainerEx";
import { ProdGridToolbarContainer } from "../../components/jobs/prod-grid/ProdGridToolbarContainer";

const A015Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<ProdGridFormContainer safeQty />
				</Box>
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
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
