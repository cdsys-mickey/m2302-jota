import AuthListView from "@/components/AuthListView/AuthListView";
import { G08Context } from "@/modules/G08/G08Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import G08 from "../G08.mjs";
import { G08ListRowContainer } from "./G08ListRowContainer";

export const G08ListViewContainer = () => {
	const g08 = useContext(G08Context);
	const { loadList } = g08;
	const form = useFormContext();

	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const adjDate = useWatch({
		name: "lvAdjDate",
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

	const debounced = useDebounce({
		q,
		adjDate,
		cust,
		custName,
	}, 300);

	const _height = useMemo(() => {
		return height ? height - 210 : 300
	}, [height])

	useInit(() => {
		g08.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: G08.transformAsQueryParams(debounced),
			supressLoading: true,
		});
	}, [debounced]);

	return (
		<ListViewBox withHeader>
			<AuthListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={g08.listLoading}
				data={g08.listData}
				itemCount={g08.itemCount}
				loadMoreItems={g08.loadMoreItems}
				isItemLoaded={g08.isItemLoaded}
				RowComponent={G08ListRowContainer}
				height={_height}
				handleItemsRendered={g08.handleItemsRendered}
				error={g08.listError}
				// bottomReached={g08.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

G08ListViewContainer.displayName = "G08ListViewContainer";


