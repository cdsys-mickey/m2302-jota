import { Box } from "@mui/material";

import A01FrameBanner from "@/mock-components/A01/A01FrameBanner";
import { A01DialogContainer } from "@/mock-components/A01/dialog/A01DialogContainer";
import { A01ItemListViewContainer } from "@/mock-components/A01/listview/A01ItemListViewContainer";
import A01ListViewToolbar from "@/mock-components/A01/listview/A01ListViewToolbar";
import { forwardRef, memo } from "react";

const MockA01Page = memo(
	forwardRef((props, ref) => {
		const { data, ...rest } = props;
		return (
			<Box>
				{/* 標題 */}
				<A01FrameBanner />
				{/* 功能 */}
				<A01ListViewToolbar />
				{/* 列表 */}
				<A01ItemListViewContainer />
				{/* 對話框 */}
				<A01DialogContainer />
			</Box>
		);
	})
);

MockA01Page.displayName = "MockA01Page";

export default MockA01Page;
