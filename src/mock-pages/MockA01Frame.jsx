import { Box, Container } from "@mui/material";

import MockA01FrameBanner from "@/mock-components/A01/MockA01FrameBanner";
import { MockA01DialogContainer } from "@/mock-components/A01/dialog/MockA01DialogContainer";
import { MockA01ItemListViewContainer } from "@/mock-components/A01/listview/MockA01ItemListViewContainer";
import MockA01ListViewToolbar from "@/mock-components/A01/listview/MockA01ListViewToolbar";
import Styles from "@/modules/md-styles";
import { memo, useMemo } from "react";

const MockA01Frame = memo((props) => {
	const { boxStyles } = props;
	return (
		<Box sx={[boxStyles]}>
			{/* 標題 */}
			<MockA01FrameBanner />
			{/* 功能 */}
			<MockA01ListViewToolbar />
			{/* 列表 */}
			<MockA01ItemListViewContainer />
			{/* 對話框 */}
			<MockA01DialogContainer />
		</Box>
	);
});
MockA01Frame.displayName = "MockA01Frame";

export default MockA01Frame;
