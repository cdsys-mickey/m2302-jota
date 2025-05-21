import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { E03ListRowContainer } from "./E03ListRowContainer";
import { E03Context } from "@/contexts/E03/E03Context";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import E03 from "@/modules/E03.mjs";
import { useMemo } from "react";

export const E03ListViewContainer = () => {
	const e03 = useContext(E03Context);
	const { loadList } = e03;
	const form = useFormContext();
	// const { getValues, setValue } = form;
	const { height } = useWindowSize();

	const q = useWatch({
		name: "q",
		control: form.control,
	});
	const returnDate = useWatch({
		name: "lvRtnDate",
		control: form.control,
	});
	const arrDate = useWatch({
		name: "lvArrDate",
		control: form.control,
	});
	const squared = useWatch({
		name: "lvSquared",
		control: form.control,
	});

	const salesType = useWatch({
		name: "lvSalesType",
		control: form.control,
	});

	const cust = useWatch({
		name: "lvCust",
		control: form.control,
	});
	const custName = useWatch({
		name: "lvCustName",
		control: form.control,
	});

	const compTel = useWatch({
		name: "lvCompTel",
		control: form.control,
	});
	const employee = useWatch({
		name: "lvEmployee",
		control: form.control,
	});

	const debounced = useDebounce({
		q,
		returnDate,
		arrDate,
		squared,
		salesType,
		cust,
		custName,
		compTel,
		employee
	}, 300);

	const _height = useMemo(() => {
		return height ? height - 232 : 300
	}, [height])

	useInit(() => {
		e03.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: E03.transformAsQueryParams(debounced),
			supressLoading: true,
		});
	}, [debounced]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={e03.listLoading}
				data={e03.listData}
				itemCount={e03.itemCount}
				loadMoreItems={e03.loadMoreItems}
				isItemLoaded={e03.isItemLoaded}
				RowComponent={E03ListRowContainer}
				height={_height}
				handleItemsRendered={e03.handleItemsRendered}
				error={e03.listError}
				// bottomReached={e03.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

E03ListViewContainer.displayName = "E03ListViewContainer";




