import { F03Context } from "@/contexts/F03/F03Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { F03ListRowContainer } from "./F03ListRowContainer";
import Forms from "../../../../shared-modules/sd-forms";

export const F03ListViewContainer = () => {
	const f03 = useContext(F03Context);
	const { loadList } = f03;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		f03.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				q: debouncedQ,
			},
			supressLoading: true,
		});
	}, [debouncedQ, f03.expProd, f03.expDate]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={f03.listLoading}
				data={f03.listData}
				itemCount={f03.itemCount}
				loadMoreItems={f03.loadMoreItems}
				isItemLoaded={f03.isItemLoaded}
				RowComponent={F03ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={f03.handleItemsRendered}
				error={f03.listError}
				// bottomReached={f03.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

F03ListViewContainer.displayName = "F03ListViewContainer";



