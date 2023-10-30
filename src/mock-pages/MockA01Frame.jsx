import { Box, Container } from "@mui/material";

import A01FrameBanner from "@/mock-components/A01/A01FrameBanner";
import { A01DialogContainer } from "@/mock-components/A01/dialog/A01DialogContainer";
import { A01ItemListViewContainer } from "@/mock-components/A01/listview/A01ItemListViewContainer";
import A01ListViewToolbar from "@/mock-components/A01/listview/A01ListViewToolbar";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";

const MockA01Frame = memo((props) => {
	const { theme, drawerOpen } = props;

	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);

	const { data, ...rest } = props;
	return (
		<Box pt={1}>
			{/* 標題 */}
			<A01FrameBanner />
			<Container maxWidth="xl">
				<Box sx={boxStyles}>
					{/* 功能 */}
					<A01ListViewToolbar />
					{/* 列表 */}
					<A01ItemListViewContainer />
					{/* 對話框 */}
					<A01DialogContainer />
				</Box>
			</Container>
		</Box>
	);
});
MockA01Frame.displayName = "MockA01Frame";

export default MockA01Frame;
