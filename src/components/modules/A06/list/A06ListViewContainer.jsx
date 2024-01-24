import { A06Context } from "@/contexts/A06/A06Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useReactWindowScroll } from "@/shared-hooks/react-window/useReactWindowScroll";
import { A06ListRowContainer } from "./A06ListRowContainer";

export const A06ListViewContainer = () => {
	const a06 = useContext(A06Context);
	const { loadList } = a06;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);
	// const { scrollOffset, onScroll } = useReactWindowScroll({ debounce: 20 });

	useInit(() => {
		a06.loadList();
	}, []);

	useEffect(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		if (debouncedQs !== undefined) {
			const values = getValues();
			loadList({ params: { ...values, qs: debouncedQs } });
			setValue("qs", debouncedQs);
		}
	}, [debouncedQs, getValues, loadList, setValue]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={a06.listLoading}
				data={a06.listData}
				itemCount={a06.itemCount}
				loadMoreItems={a06.loadMoreItems}
				isItemLoaded={a06.isItemLoaded}
				RowComponent={A06ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={a06.handleItemsRendered}
				error={a06.listError}
				// bottomReached={a06.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

A06ListViewContainer.displayName = "A06ListViewContainer";
