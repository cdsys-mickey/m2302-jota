import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A014GridContainer } from "../../components/modules/A014/A014GridContainer";
import { ProdGridFormContainer } from "../../components/modules/prod-grid/ProdGridFormContainer";
import ProdGridToolbar from "../../components/modules/prod-grid/ProdGridToolbar";
import ContainerEx from "../../shared-components/ContainerEx";

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
				<ProdGridToolbar />
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
