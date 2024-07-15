import { C06Context } from "@/contexts/C06/C06Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { C06ListRowContainer } from "./C06ListRowContainer";

export const C06ListViewContainer = () => {
	const c06 = useContext(C06Context);
	const { loadList } = c06;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		c06.loadList({
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
				loading={c06.listLoading}
				data={c06.listData}
				itemCount={c06.itemCount}
				loadMoreItems={c06.loadMoreItems}
				isItemLoaded={c06.isItemLoaded}
				RowComponent={C06ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c06.handleItemsRendered}
				error={c06.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C06ListViewContainer.displayName = "C06ListViewContainer";
