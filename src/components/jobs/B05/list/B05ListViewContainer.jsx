import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { B05ListRowContainer } from "./B05ListRowContainer";
import { B05Context } from "@/contexts/B05/B05Context";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";

export const B05ListViewContainer = () => {
	const b05 = useContext(B05Context);
	const { loadList } = b05;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		b05.loadList();
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
			const values = getValues();
			loadList({
				params: { ...values, q: debouncedQs },
				supressLoading: true,
			});
			// setValue("q", debouncedQs);
		}
	}, [debouncedQs]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b05.listLoading}
				data={b05.listData}
				itemCount={b05.itemCount}
				loadMoreItems={b05.loadMoreItems}
				isItemLoaded={b05.isItemLoaded}
				RowComponent={B05ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={b05.handleItemsRendered}
				error={b05.listError}
				// bottomReached={b05.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B05ListViewContainer.displayName = "B05ListViewContainer";
