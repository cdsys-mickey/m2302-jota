import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { PushMessagesContext } from "@/contexts/PushMessagesContext";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { TaskListRowContainer } from "./TaskListRowContainer";


export const TaskListViewContainer = () => {
	// const auth = useContext(AuthContext);
	// const { refreshList } = auth;
	const pushMessages = useContext(PushMessagesContext);
	const { refreshList } = pushMessages;

	const { height } = useWindowSize();

	useInit(() => {
		refreshList();
	}, []);

	return (
		<InfiniteLoaderProvider>
			<ListViewBox square>
				<InfiniteListView
					loading={pushMessages.listLoading}
					data={pushMessages.listData}
					itemCount={pushMessages.itemCount}
					loadMoreItems={pushMessages.loadMoreItems}
					isItemLoaded={pushMessages.isItemLoaded}
					RowComponent={TaskListRowContainer}
					height={height ? height - 200 : 300}
					handleItemsRendered={pushMessages.handleItemsRendered}
					error={pushMessages.listError}
					// bottomReached={users.bottomReached}
					bottomReached={true}
				/>
			</ListViewBox>
		</InfiniteLoaderProvider>
	);
};

TaskListViewContainer.displayName = "TaskListViewContainer";
