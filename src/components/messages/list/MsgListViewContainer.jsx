import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MessagingContext } from "../../../contexts/MessagingContext";
import { MsgListRowContainer } from "./MsgListRowContainer";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { MessagesContext } from "../../../contexts/MessagesContext";

export const MsgListViewContainer = () => {
	// const messaging = useContext(MessagingContext);
	// const { loadList } = messaging;
	const messages = useContext(MessagesContext);
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		messages.loadList();
	}, []);

	useChangeTracking(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		if (debouncedQs !== undefined) {
			const values = getValues();
			messages.loadList({
				params: { ...values, qs: debouncedQs },
				supressLoading: true,
			});
			setValue("qs", debouncedQs);
		}
	}, [debouncedQs]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				loading={messages.listLoading}
				data={messages.listData}
				itemCount={messages.itemCount}
				loadMoreItems={messages.loadMoreItems}
				isItemLoaded={messages.isItemLoaded}
				RowComponent={MsgListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={messages.handleItemsRendered}
				error={messages.listError}
				// bottomReached={users.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

MsgListViewContainer.displayName = "MsgListViewContainer";
