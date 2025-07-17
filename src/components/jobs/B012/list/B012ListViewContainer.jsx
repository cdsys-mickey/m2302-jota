import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { B012ListRowContainer } from "./B012ListRowContainer";
import { B012Context } from "@/contexts/B012/B012Context";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import B012 from "@/modules/md-b012";
import { useMemo } from "react";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

export const B012ListViewContainer = () => {
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	const { loadList } = b012;
	const form = useFormContext();
	// const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const lvProd = useWatch({
		name: "lvProd",
		control: form.control,
	});
	const lvDate = useWatch({
		name: "lvDate",
		control: form.control,
	});
	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})

	useInit(() => {
		b012.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: B012.transformAsQueryParams({
				lvProd,
				lvDate,
				lvEmployee
			}),
			supressLoading: true,
		});
	}, [lvProd, lvDate, lvEmployee]);

	const _height = useMemo(() => {
		return height ? height - 200 : 300
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b012.listLoading}
				data={b012.listData}
				itemCount={b012.itemCount}
				loadMoreItems={b012.loadMoreItems}
				isItemLoaded={b012.isItemLoaded}
				RowComponent={B012ListRowContainer}
				height={_height}
				handleItemsRendered={b012.handleItemsRendered}
				error={b012.listError}
				// bottomReached={b012.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B012ListViewContainer.displayName = "B012ListViewContainer";


