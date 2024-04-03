import { A20Context } from "@/contexts/A20/A20Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../../shared-components/listview/ListViewBox";
import { A20ListRowContainer } from "./A20ListRowContainer";

export const A20ListViewContainer = () => {
	const a20 = useContext(A20Context);
	const { loadList } = a20;
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
		a20.loadList();
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
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={a20.listLoading}
				// loading={false}
				data={a20.listData}
				itemCount={a20.itemCount}
				loadMoreItems={a20.loadMoreItems}
				isItemLoaded={a20.isItemLoaded}
				RowComponent={A20ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={a20.handleItemsRendered}
				error={a20.listError}
				// bottomReached={a20.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

A20ListViewContainer.displayName = "A20ListViewContainer";
