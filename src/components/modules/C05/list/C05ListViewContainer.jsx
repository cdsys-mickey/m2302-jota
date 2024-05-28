import { C05Context } from "@/contexts/C05/C05Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { C05ListRowContainer } from "./C05ListRowContainer";
import Forms from "@/shared-modules/sd-forms";

export const C05ListViewContainer = () => {
	const c05 = useContext(C05Context);
	const { loadList } = c05;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		c05.loadList({
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
				loading={c05.listLoading}
				data={c05.listData}
				itemCount={c05.itemCount}
				loadMoreItems={c05.loadMoreItems}
				isItemLoaded={c05.isItemLoaded}
				RowComponent={C05ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c05.handleItemsRendered}
				error={c05.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C05ListViewContainer.displayName = "C05ListViewContainer";
