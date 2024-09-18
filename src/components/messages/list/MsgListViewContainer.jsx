import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MessagesContext } from "@/contexts/msgs/MessagesContext";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { MsgListRowContainer } from "./MsgListRowContainer";

export const MsgListViewContainer = () => {
	// const messaging = useContext(MessagingContext);
	// const { loadList } = messaging;
	const msgs = useContext(MessagesContext);
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		msgs.loadList();
	}, []);

	useChangeTracking(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		if (debouncedQs !== undefined) {
			const values = getValues();
			msgs.loadList({
				params: { ...values, qs: debouncedQs },
				supressLoading: true,
			});
			setValue("qs", debouncedQs);
		}
	}, [debouncedQs]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				loading={msgs.listLoading}
				data={msgs.listData}
				itemCount={msgs.itemCount}
				loadMoreItems={msgs.loadMoreItems}
				isItemLoaded={msgs.isItemLoaded}
				RowComponent={MsgListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={msgs.handleItemsRendered}
				error={msgs.listError}
				// bottomReached={users.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

MsgListViewContainer.displayName = "MsgListViewContainer";
