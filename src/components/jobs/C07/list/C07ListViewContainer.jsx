import { C07Context } from "@/contexts/C07/C07Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { C07ListRowContainer } from "./C07ListRowContainer";

export const C07ListViewContainer = () => {
	const c07 = useContext(C07Context);
	const { loadList } = c07;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		c07.loadList({
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
				loading={c07.listLoading}
				data={c07.listData}
				itemCount={c07.itemCount}
				loadMoreItems={c07.loadMoreItems}
				isItemLoaded={c07.isItemLoaded}
				RowComponent={C07ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c07.handleItemsRendered}
				error={c07.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C07ListViewContainer.displayName = "C07ListViewContainer";
