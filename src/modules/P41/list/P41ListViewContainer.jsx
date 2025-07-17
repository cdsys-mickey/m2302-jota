import { P41Context } from "@/modules/P41/P41Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useReactWindowScroll } from "../../../shared-hooks/react-window/useReactWindowScroll";
import { P41ListRowContainer } from "./P41ListRowContainer";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { useMemo } from "react";

export const P41ListViewContainer = () => {
	const p41 = useContext(P41Context);
	const { loadList } = p41;
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
		p41.loadList();
	}, []);

	useChangeTracking(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		if (debouncedQs !== undefined) {
			const values = getValues();
			loadList({
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
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={p41.listLoading}
				data={p41.listData}
				itemCount={p41.itemCount}
				loadMoreItems={p41.loadMoreItems}
				isItemLoaded={p41.isItemLoaded}
				RowComponent={P41ListRowContainer}
				height={_height}
				handleItemsRendered={p41.handleItemsRendered}
				error={p41.listError}
				// bottomReached={p41.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

P41ListViewContainer.displayName = "P41ListViewContainer";



