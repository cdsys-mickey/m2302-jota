import { A16Context } from "@/modules/A16/A16Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { A16ListRowContainer } from "./A16ListRowContainer";
import { useMemo } from "react";

export const A16ListViewContainer = () => {
	const a16 = useContext(A16Context);
	const { loadList } = a16;
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
		a16.loadList();
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
				loading={a16.listLoading}
				data={a16.listData}
				itemCount={a16.itemCount}
				loadMoreItems={a16.loadMoreItems}
				isItemLoaded={a16.isItemLoaded}
				RowComponent={A16ListRowContainer}
				height={_height}
				handleItemsRendered={a16.handleItemsRendered}
				error={a16.listError}
				// bottomReached={a16.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

A16ListViewContainer.displayName = "A16ListViewContainer";

