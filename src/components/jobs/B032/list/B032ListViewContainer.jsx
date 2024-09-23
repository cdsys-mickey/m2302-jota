import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { B032ListRowContainer } from "./B032ListRowContainer";
import { B032Context } from "@/contexts/B032/B032Context";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import B032 from "@/modules/md-b032";

export const B032ListViewContainer = () => {
	const b032 = useContext(B032Context);
	const { loadList } = b032;
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
		b032.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: B032.transformAsQueryParams({
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
				loading={b032.listLoading}
				data={b032.listData}
				itemCount={b032.itemCount}
				loadMoreItems={b032.loadMoreItems}
				isItemLoaded={b032.isItemLoaded}
				RowComponent={B032ListRowContainer}
				height={height ? height - 232 : 300}
				handleItemsRendered={b032.handleItemsRendered}
				error={b032.listError}
				// bottomReached={b032.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B032ListViewContainer.displayName = "B032ListViewContainer";



