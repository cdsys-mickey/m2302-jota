import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { PushMessagesContext } from "@/contexts/PushMessagesContext";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { TaskListRowContainer } from "./TaskListRowContainer";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWindowSize } from "@/shared-hooks/useWindowSize";


export const TaskListViewContainer = () => {
	// const auth = useContext(AuthContext);
	// const { refreshList } = auth;
	const pushMessages = useContext(PushMessagesContext);
	const { refreshList } = pushMessages;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return Math.min(height - 200, 600);
	}, [height])

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
					height={_height}
					handleItemsRendered={pushMessages.handleItemsRendered}
					error={pushMessages.listError}
					// bottomReached={users.bottomReached}
					bottomReached={true}
				/>
			</ListViewBox>
		</InfiniteLoaderProvider>
	);
};
TaskListViewContainer.propTypes = {
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
TaskListViewContainer.displayName = "TaskListViewContainer";
