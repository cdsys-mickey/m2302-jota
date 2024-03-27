import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { TaskListRowContainer } from "./task/TaskListRowContainer";

export const TaskListViewContainer = () => {
	const auth = useContext(AuthContext);
	const { refreshList } = auth;

	const { height } = useWindowSize();

	useInit(() => {
		refreshList();
	}, []);

	return (
		<ListViewBox square>
			<InfiniteListView
				loading={auth.listLoading}
				data={auth.listData}
				itemCount={auth.itemCount}
				loadMoreItems={auth.loadMoreItems}
				isItemLoaded={auth.isItemLoaded}
				RowComponent={TaskListRowContainer}
				height={height ? height - 200 : 300}
				handleItemsRendered={auth.handleItemsRendered}
				error={auth.listError}
				// bottomReached={users.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

TaskListViewContainer.displayName = "TaskListViewContainer";
