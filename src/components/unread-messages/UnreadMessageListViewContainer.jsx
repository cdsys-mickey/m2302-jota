import { UnreadMessagesContext } from "@/contexts/UnreadMessagesContext";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import AuthListView from "../AuthListView/AuthListView";
import { UnreadMessageListRowContainer } from "./UnreadMessageListRow/UnreadMessageListRowContainer";


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
				<AuthListView
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
