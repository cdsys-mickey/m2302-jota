import { A05Context } from "@/contexts/A05/A05Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../../shared-components/listview/ListViewBox";
import { useReactWindowScroll } from "../../../../shared-hooks/react-window/useReactWindowScroll";
import { A05ListRowContainer } from "./A05ListRowContainer";

export const A05ListViewContainer = () => {
	const a05 = useContext(A05Context);
	const { loadList } = a05;
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
		a05.loadList();
	}, []);

	useEffect(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		if (debouncedQs !== undefined) {
			const values = getValues();
			loadList({
				params: { ...values, qs: debouncedQs },
			});
			setValue("qs", debouncedQs);
		}
	}, [debouncedQs, getValues, loadList, setValue]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={a05.listLoading}
				data={a05.listData}
				itemCount={a05.itemCount}
				loadMoreItems={a05.loadMoreItems}
				isItemLoaded={a05.isItemLoaded}
				RowComponent={A05ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={a05.handleItemsRendered}
				error={a05.listError}
				// bottomReached={a05.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

A05ListViewContainer.displayName = "A05ListViewContainer";
