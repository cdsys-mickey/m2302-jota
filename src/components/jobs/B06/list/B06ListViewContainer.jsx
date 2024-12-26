import { B06Context } from "@/contexts/B06/B06Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { B06ListRowContainer } from "./B06ListRowContainer";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import B06 from "@/modules/md-b06";

export const B06ListViewContainer = () => {
	const b06 = useContext(B06Context);
	// const { loadList } = b06;
	const form = useFormContext();
	// const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	const lvSupplier = useWatch({
		name: "lvSupplier",
		control: form.control
	})
	const debouncedSupplier = useDebounceObject(lvSupplier, 300);

	const lvSupplier2 = useWatch({
		name: "lvSupplier2",
		control: form.control
	})
	const debouncedSupplier2 = useDebounceObject(lvSupplier2, 300);

	const lvDate = useWatch({
		name: "date1",
		control: form.control
	})
	const debouncedDate = useDebounceObject(lvDate, 300);

	const lvDate2 = useWatch({
		name: "date2",
		control: form.control
	})
	const debouncedDate2 = useDebounceObject(lvDate2, 300);

	const lvProd = useWatch({
		name: "sprod",
		control: form.control
	})
	const debouncedProd = useDebounceObject(lvProd, 300);

	const lvProd2 = useWatch({
		name: "eprod",
		control: form.control
	})
	const debouncedProd2 = useDebounceObject(lvProd2, 300);

	const lvOrderBy = useWatch({
		name: "orderBy",
		control: form.control
	})
	const debouncedOrderBy = useDebounceObject(lvOrderBy, 300);

	useInit(() => {
		b06.loadList();
	}, []);

	useChangeTracking(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		b06.loadList({
			params: {
				...(debouncedQs && {
					qs: debouncedQs,
				}),
				...B06.transformAsQueryParams({
					supplier: debouncedSupplier,
					supplier2: debouncedSupplier2,
					date1: debouncedDate,
					date2: debouncedDate2,
					sprod: debouncedProd,
					eprod: debouncedProd2,
					orderBy: debouncedOrderBy
				})
			},
			supressLoading: true,
		});
	}, [debouncedQs, debouncedSupplier, debouncedSupplier2, debouncedDate, debouncedDate2, debouncedProd, debouncedProd2, debouncedOrderBy]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b06.listLoading}
				data={b06.listData}
				itemCount={b06.itemCount}
				loadMoreItems={b06.loadMoreItems}
				isItemLoaded={b06.isItemLoaded}
				RowComponent={B06ListRowContainer}
				height={height ? height - 236 : 300}
				handleItemsRendered={b06.handleItemsRendered}
				error={b06.listError}
				// bottomReached={b06.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B06ListViewContainer.displayName = "B06ListViewContainer";
