import MockA01FrameBanner from "@/mock-components/A01/MockA01FrameBanner";
import { A01DialogContainer } from "@/mock-components/A01/dialog/A01DialogContainer";
import { MockA01ItemListViewContainer } from "@/mock-components/A01/listview/MockA01ItemListViewContainer";
import MockA01ListViewToolbar from "@/mock-components/A01/listview/MockA01ListViewToolbar";
import { Box } from "@mui/material";
import { memo } from "react";

const A01Frame = memo(() => {
	return (
		<Box pt={1}>
			{/* 標題 */}
			<MockA01FrameBanner />
			{/* 功能 */}
			<MockA01ListViewToolbar />
			{/* 列表 */}
			<MockA01ItemListViewContainer />
			{/* 對話框 */}
			<A01DialogContainer />
		</Box>
	);
});
A01Frame.displayName = "A01Frame";

export default A01Frame;
