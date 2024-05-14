import { C04Context } from "@/contexts/C04/C04Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { C04ListRowContainer } from "./C04ListRowContainer";

export const C04ListViewContainer = () => {
	const c04 = useContext(C04Context);
	const { loadList } = c04;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		c04.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: { q: debouncedQ },
			supressLoading: true,
		});
	}, [debouncedQ]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={c04.listLoading}
				data={c04.listData}
				itemCount={c04.itemCount}
				loadMoreItems={c04.loadMoreItems}
				isItemLoaded={c04.isItemLoaded}
				RowComponent={C04ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c04.handleItemsRendered}
				error={c04.listError}
				// bottomReached={c04.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C04ListViewContainer.displayName = "C04ListViewContainer";
