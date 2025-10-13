import AuthListView from "@/components/AuthListView/AuthListView";
import { AllMessagesContext } from "@/contexts/msgs/AllMessagesContext";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MsgListRowContainer } from "./MsgListRowContainer";

export const MsgListViewContainer = () => {
	const msgs = useContext(AllMessagesContext);
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

	const _height = useMemo(() => {
		return height ? height - 162 : 300
	}, [height])

	return (
		<ListViewBox withHeader>
			<AuthListView
				loading={msgs.listLoading}
				data={msgs.listData}
				itemCount={msgs.itemCount}
				loadMoreItems={msgs.loadMoreItems}
				isItemLoaded={msgs.isItemLoaded}
				RowComponent={MsgListRowContainer}
				height={_height}
				handleItemsRendered={msgs.handleItemsRendered}
				error={msgs.listError}
				// bottomReached={users.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

MsgListViewContainer.displayName = "MsgListViewContainer";
