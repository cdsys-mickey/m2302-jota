import { P34Context } from "@/modules/P34/P34Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useReactWindowScroll } from "../../../shared-hooks/react-window/useReactWindowScroll";
import { P34ListRowContainer } from "./P34ListRowContainer";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";

export const P34ListViewContainer = () => {
	const p34 = useContext(P34Context);
	const { loadList } = p34;
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
		p34.loadList();
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

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={p34.listLoading}
				data={p34.listData}
				itemCount={p34.itemCount}
				loadMoreItems={p34.loadMoreItems}
				isItemLoaded={p34.isItemLoaded}
				RowComponent={P34ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={p34.handleItemsRendered}
				error={p34.listError}
				// bottomReached={p34.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

P34ListViewContainer.displayName = "P34ListViewContainer";

