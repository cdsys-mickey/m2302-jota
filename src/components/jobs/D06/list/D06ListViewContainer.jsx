import { D06Context } from "@/contexts/D06/D06Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { D06ListRowContainer } from "./D06ListRowContainer";

export const D06ListViewContainer = () => {
	const d06 = useContext(D06Context);
	const { loadList } = d06;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		d06.loadList({
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
	}, [debouncedQ]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={d06.listLoading}
				data={d06.listData}
				itemCount={d06.itemCount}
				loadMoreItems={d06.loadMoreItems}
				isItemLoaded={d06.isItemLoaded}
				RowComponent={D06ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={d06.handleItemsRendered}
				error={d06.listError}
				// bottomReached={d06.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D06ListViewContainer.displayName = "D06ListViewContainer";
