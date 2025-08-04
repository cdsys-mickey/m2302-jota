import { G02Context } from "@/modules/G02/G02Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { G02ListRowContainer } from "./G02ListRowContainer";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import G02 from "../G02.mjs";
import { InfiniteLoaderContext } from "@/contexts/infinite-loader/InfiniteLoaderContext";

export const G02ListViewContainer = () => {
	const g02 = useContext(G02Context);
	const { loadList } = g02;
	const form = useFormContext();
	const { height } = useWindowSize();
	const listLoader = useContext(InfiniteLoaderContext);

	const lvEDate = useWatch({
		name: "lvEDate",
		control: form.control
	})
	const debouncedDate = useDebounce(lvEDate, 300);

	const lvCustId = useWatch({
		name: "lvCustID",
		control: form.control
	})
	const debouncedCustId = useDebounce(lvCustId, 300);

	const lvCustName = useWatch({
		name: "lvCustName",
		control: form.control
	})
	const debouncedCustName = useDebounce(lvCustName, 300);

	const lvTel = useWatch({
		name: "lvTel",
		control: form.control
	})
	const debouncedTel = useDebounce(lvTel, 300);

	const lvID = useWatch({
		name: "lvID",
		control: form.control
	})
	const debouncedID = useDebounce(lvID, 300);

	useInit(() => {
		g02.loadList();
	}, []);

	useChangeTracking(() => {
		listLoader.uncheckAll();
		loadList({
			params: {
				...G02.transformAsQueryParams({
					lvEDate: debouncedDate,
					lvCustId: debouncedCustId,
					lvCustName: debouncedCustName,
					lvTel: debouncedTel,
					lvID: debouncedID
				})
			},
			supressLoading: true,
		});
	}, [debouncedDate, debouncedCustId, debouncedCustName, debouncedTel, debouncedID]);

	const _height = useMemo(() => {
		return height ? height - (g02.isAnyChecked ? 240 : 200) : 300;
	}, [g02.isAnyChecked, height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={g02.listLoading}
				data={g02.listData}
				itemCount={g02.itemCount}
				loadMoreItems={g02.loadMoreItems}
				isItemLoaded={g02.isItemLoaded}
				RowComponent={G02ListRowContainer}
				height={_height}
				handleItemsRendered={g02.handleItemsRendered}
				error={g02.listError}
				// bottomReached={g02.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

G02ListViewContainer.displayName = "G02ListViewContainer";

