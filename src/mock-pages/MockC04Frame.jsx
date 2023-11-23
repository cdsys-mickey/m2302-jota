import { Box } from "@mui/material";

import C04FrameBannerContainer from "@/mock-components/C04/C04FrameBannerContainer";
import C04DialogContainer from "@/mock-components/C04/dialog/C04DialogContainer";
import C04ListViewContainer from "@/mock-components/C04/listview/C04ListViewContainer";
import C04ListViewToolbar from "@/mock-components/C04/listview/C04ListViewToolbar";
import PropTypes from "prop-types";
import { memo } from "react";

const MockC04Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<>
			<Box sx={[boxStyles]}>
				<C04FrameBannerContainer />
				{/* <FrameBannerContainer title="進貨單輸入作業" alt="C04" /> */}
				<C04ListViewToolbar />
				<C04ListViewContainer />
				<C04DialogContainer />
			</Box>
		</>
	);
});
MockC04Frame.displayName = "MockC04Frame";
MockC04Frame.propTypes = {
	boxStyles: PropTypes.object,
};

export default MockC04Frame;
