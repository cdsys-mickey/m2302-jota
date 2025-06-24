import { P21Context } from "@/modules/P21/P21Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useReactWindowScroll } from "../../../shared-hooks/react-window/useReactWindowScroll";
import { P21ListRowContainer } from "./P21ListRowContainer";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";

export const P21ListViewContainer = () => {
	const p21 = useContext(P21Context);
	const { loadList } = p21;
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
		p21.loadList();
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
				loading={p21.listLoading}
				data={p21.listData}
				itemCount={p21.itemCount}
				loadMoreItems={p21.loadMoreItems}
				isItemLoaded={p21.isItemLoaded}
				RowComponent={P21ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={p21.handleItemsRendered}
				error={p21.listError}
				// bottomReached={p21.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

P21ListViewContainer.displayName = "P21ListViewContainer";


