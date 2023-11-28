import { useContext } from "react";
import { A01Context } from "@/contexts/a01/A01Context";
import InfiniteListView from "@/shared-components/infinite-listview/InfiniteListView";
import A01ListRow from "./A01ListRow";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useInit } from "@/shared-hooks/useInit";
import { A01ListRowContainer } from "./A01ListRowContainer";
import { Box, Paper } from "@mui/material";

export const A01ListViewContainer = () => {
	const a01 = useContext(A01Context);
	const { height } = useWindowSize();

	useInit(() => {
		// a01.load({ start: 0, stop: 50 });
		a01.loadList();
	}, []);

	return (
		<Box component={Paper} pr="2px">
			<InfiniteListView
				loading={a01.listLoading}
				data={a01.data}
				itemCount={a01.itemCount}
				loadMoreItems={a01.loadMoreItems}
				isItemLoaded={a01.isItemLoaded}
				rowComponent={A01ListRowContainer}
				height={height - 142}
				handleItemsRendered={a01.handleItemsRendered}
			/>
		</Box>
	);
};

A01ListViewContainer.displayName = "A01ListViewContainer";
