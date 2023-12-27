import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A011FormContainer } from "@/components/modules/A011/A011FormContainer";
import A011Toolbar from "@/components/modules/A011/A011Toolbar";
import { A011GridContainer } from "../../components/modules/A011/A011GridContainer";
import { A011ToolbarContainer } from "../../components/modules/A011/A011ToolbarContainer";

const A011Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Container maxWidth="md">
				<Box>
					<A011FormContainer />
				</Box>
			</Container>
			<Box>
				<A011ToolbarContainer />
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
