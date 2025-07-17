import { B031Context } from "@/contexts/B031/B031Context";
import B031 from "@/modules/md-b031";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { B031ListRowContainer } from "./B031ListRowContainer";

export const B031ListViewContainer = () => {
	const b031 = useContext(B031Context);
	const { loadList } = b031;
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
		b031.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: B031.transformAsQueryParams({
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

	const _height = useMemo(() => {
		return height ? height - 250 : 300
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b031.listLoading}
				data={b031.listData}
				itemCount={b031.itemCount}
				loadMoreItems={b031.loadMoreItems}
				isItemLoaded={b031.isItemLoaded}
				RowComponent={B031ListRowContainer}
				height={_height}
				handleItemsRendered={b031.handleItemsRendered}
				error={b031.listError}
				// bottomReached={b031.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B031ListViewContainer.displayName = "B031ListViewContainer";


