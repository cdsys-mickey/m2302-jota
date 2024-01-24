import A01Toolbar from "@/components/modules/A01/A01Toolbar";
import { A01DialogContainer } from "@/components/modules/A01/dialog/A01DialogContainer";
import A01ListHeader from "@/components/modules/A01/list/A01ListHeader";
import { A01ListViewContainer } from "@/components/modules/A01/list/A01ListViewContainer";
import { ProdSearchFieldContainer } from "@/components/modules/A01/search/ProdSearchFieldContainer";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const ZZA01Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			{/* 標題 */}
			<FrameBannerContainer>
				{ProdSearchFieldContainer}
			</FrameBannerContainer>
			{/* 工具列 */}
			<A01Toolbar />
			{/* 列表 */}
			<A01ListHeader />
			<A01ListViewContainer />

			{/* 對話框 */}
			<A01DialogContainer />
		</Box>
	);
});
ZZA01Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
ZZA01Frame.displayName = "ZZA01Frame";

export default ZZA01Frame;
