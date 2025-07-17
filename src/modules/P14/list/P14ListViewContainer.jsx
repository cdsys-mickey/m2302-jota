import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { P14ListRowContainer } from "./P14ListRowContainer";
import { P14Context } from "@/modules/P14/P14Context";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { useMemo } from "react";

export const P14ListViewContainer = () => {
	const p14 = useContext(P14Context);
	const { loadList } = p14;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		p14.loadList();
	}, []);

	// useEffect(() => {
	// 	console.log(`debouncedQs: ${debouncedQs}`);
	// 	if (debouncedQs !== undefined) {
	// 		const values = getValues();
	// 		loadList({
	// 			params: { ...values, q: debouncedQs },
	// 			supressLoading: true,
	// 		});
	// 		setValue("q", debouncedQs);
	// 	}
	// }, [debouncedQs, getValues, loadList, setValue]);

	useChangeTracking(() => {
		if (debouncedQs !== undefined) {
			// const values = getValues();
			loadList({
				params: {
					q: debouncedQs
				},
				supressLoading: true,
			});
			// setValue("q", debouncedQs);
		}
	}, [debouncedQs]);

	const _height = useMemo(() => {
		// return height ? height - 162 : 300
		return height ? height - 100 : 300
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={p14.listLoading}
				data={p14.listData}
				itemCount={p14.itemCount}
				loadMoreItems={p14.loadMoreItems}
				isItemLoaded={p14.isItemLoaded}
				RowComponent={P14ListRowContainer}
				height={_height}
				handleItemsRendered={p14.handleItemsRendered}
				error={p14.listError}
				// bottomReached={p14.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

P14ListViewContainer.displayName = "P14ListViewContainer";


