import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { B011ListRowContainer } from "./B011ListRowContainer";
import { B011Context } from "@/contexts/B011/B011Context";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import B011 from "@/modules/md-b011";

export const B011ListViewContainer = () => {
	const b011 = useContext(B011Context);
	const { loadList } = b011;
	const form = useFormContext();
	// const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const cust = useWatch({
		name: "lvCust",
		control: form.control,
	});
	const cust2 = useWatch({
		name: "lvCust2",
		control: form.control,
	});
	const prod = useWatch({
		name: "lvProd",
		control: form.control,
	});
	const prod2 = useWatch({
		name: "lvProd2",
		control: form.control,
	});
	const date = useWatch({
		name: "lvDate",
		control: form.control,
	});
	const date2 = useWatch({
		name: "lvDate2",
		control: form.control,
	});

	useInit(() => {
		b011.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: B011.transformAsQueryParams({
				cust,
				cust2,
				prod,
				prod2,
				date,
				date2
			}),
			supressLoading: true,
		});
	}, [cust, cust2, prod, prod2, date, date2]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b011.listLoading}
				data={b011.listData}
				itemCount={b011.itemCount}
				loadMoreItems={b011.loadMoreItems}
				isItemLoaded={b011.isItemLoaded}
				RowComponent={B011ListRowContainer}
				height={height ? height - 232 : 300}
				handleItemsRendered={b011.handleItemsRendered}
				error={b011.listError}
				// bottomReached={b011.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B011ListViewContainer.displayName = "B011ListViewContainer";

