import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { F01ListRowContainer } from "./F01ListRowContainer";
import { F01Context } from "@/modules/F01/F01Context";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";

export const F01ListViewContainer = () => {
	const f01 = useContext(F01Context);
	const { loadList } = f01;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		f01.loadList();
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

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={f01.listLoading}
				data={f01.listData}
				itemCount={f01.itemCount}
				loadMoreItems={f01.loadMoreItems}
				isItemLoaded={f01.isItemLoaded}
				RowComponent={F01ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={f01.handleItemsRendered}
				error={f01.listError}
				// bottomReached={f01.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

F01ListViewContainer.displayName = "F01ListViewContainer";

