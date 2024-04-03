import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MessagingContext } from "../../../contexts/MessagingContext";
import { MsgListRowContainer } from "./MsgListRowContainer";

export const MsgListViewContainer = () => {
	const messaging = useContext(MessagingContext);
	const { loadList } = messaging;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		messaging.loadList();
	}, []);

	useEffect(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		if (debouncedQs !== undefined) {
			const values = getValues();
			loadList({
				params: { ...values, qs: debouncedQs },
				supressLoading: true,
			});
			setValue("qs", debouncedQs);
		}
	}, [debouncedQs, getValues, loadList, setValue]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				loading={messaging.listLoading}
				data={messaging.listData}
				itemCount={messaging.itemCount}
				loadMoreItems={messaging.loadMoreItems}
				isItemLoaded={messaging.isItemLoaded}
				RowComponent={MsgListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={messaging.handleItemsRendered}
				error={messaging.listError}
				// bottomReached={users.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

MsgListViewContainer.displayName = "MsgListViewContainer";
