import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { UnreadMessagesContext } from "@/contexts/UnreadMessagesContext";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import { UnreadMessageListRowContainer } from "./UnreadMessageListRow/UnreadMessageListRowContainer";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWindowSize } from "@/shared-hooks/useWindowSize";


export const UnreadMessageListViewContainer = () => {
	const unreadMessages = useContext(UnreadMessagesContext);
	const { refreshList } = unreadMessages;
	const { height } = useWindowSize();

	const _height = useMemo(() => {
		return height ? Math.min(height - 200, 600) : 300;
	}, [height])

	useInit(() => {
		refreshList();
	}, []);

	return (
		<InfiniteLoaderProvider>
			<ListViewBox square>
				<InfiniteListView
					loading={unreadMessages.listLoading}
					data={unreadMessages.listData}
					itemCount={unreadMessages.itemCount}
					loadMoreItems={unreadMessages.loadMoreItems}
					isItemLoaded={unreadMessages.isItemLoaded}
					RowComponent={UnreadMessageListRowContainer}
					height={_height}
					handleItemsRendered={unreadMessages.handleItemsRendered}
					error={unreadMessages.listError}
					// bottomReached={users.bottomReached}
					bottomReached={true}
				/>
			</ListViewBox>
		</InfiniteLoaderProvider>
	);
};
UnreadMessageListViewContainer.propTypes = {
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
UnreadMessageListViewContainer.displayName = "TaskListViewContainer";
