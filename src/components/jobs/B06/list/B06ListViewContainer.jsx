import { B06Context } from "@/contexts/B06/B06Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { B06ListRowContainer } from "./B06ListRowContainer";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";

export const B06ListViewContainer = () => {
	const b06 = useContext(B06Context);
	// const { loadList } = b06;
	// const form = useFormContext();
	// const { getValues, setValue } = form;
	const { height } = useWindowSize();
	// const qs = useWatch({
	// 	name: "qs",
	// 	control: form.control,
	// });

	// const debouncedQs = useDebounce(qs, 300);

	// useInit(() => {
	// 	b06.loadList();
	// }, []);

	// useChangeTracking(() => {
	// 	console.log(`debouncedQs: ${debouncedQs}`);
	// 	if (debouncedQs !== undefined) {
	// 		const values = getValues();
	// 		loadList({
	// 			params: { ...values, qs: debouncedQs },
	// 			supressLoading: true,
	// 		});
	// 		setValue("qs", debouncedQs);
	// 	}
	// }, [debouncedQs]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b06.listLoading}
				data={b06.listData}
				itemCount={b06.itemCount}
				loadMoreItems={b06.loadMoreItems}
				isItemLoaded={b06.isItemLoaded}
				RowComponent={B06ListRowContainer}
				height={height ? height - 246 : 300}
				handleItemsRendered={b06.handleItemsRendered}
				error={b06.listError}
				// bottomReached={b06.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B06ListViewContainer.displayName = "B06ListViewContainer";
