import { P42Context } from "@/modules/P42/P42Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useReactWindowScroll } from "../../../shared-hooks/react-window/useReactWindowScroll";
import { P42ListRowContainer } from "./P42ListRowContainer";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { useMemo } from "react";

export const P42ListViewContainer = () => {
	const p42 = useContext(P42Context);
	const { loadList } = p42;
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
		p42.loadList();
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
				loading={p42.listLoading}
				data={p42.listData}
				itemCount={p42.itemCount}
				loadMoreItems={p42.loadMoreItems}
				isItemLoaded={p42.isItemLoaded}
				RowComponent={P42ListRowContainer}
				height={_height}
				handleItemsRendered={p42.handleItemsRendered}
				error={p42.listError}
				// bottomReached={p42.bottomReached}
				bottomReached={true}

			/>
		</ListViewBox>
	);
};

P42ListViewContainer.displayName = "P42ListViewContainer";




