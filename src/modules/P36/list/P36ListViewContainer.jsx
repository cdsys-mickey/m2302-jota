import { P36Context } from "@/modules/P36/P36Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useReactWindowScroll } from "../../../shared-hooks/react-window/useReactWindowScroll";
import { P36ListRowContainer } from "./P36ListRowContainer";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { useMemo } from "react";

export const P36ListViewContainer = () => {
	const p36 = useContext(P36Context);
	const { loadList } = p36;
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
		p36.loadList();
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
				loading={p36.listLoading}
				data={p36.listData}
				itemCount={p36.itemCount}
				loadMoreItems={p36.loadMoreItems}
				isItemLoaded={p36.isItemLoaded}
				RowComponent={P36ListRowContainer}
				height={_height}
				handleItemsRendered={p36.handleItemsRendered}
				error={p36.listError}
				// bottomReached={p36.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

P36ListViewContainer.displayName = "P36ListViewContainer";



