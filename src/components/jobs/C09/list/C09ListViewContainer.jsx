import { C09Context } from "@/contexts/C09/C09Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { C09ListRowContainer } from "./C09ListRowContainer";
import Forms from "@/shared-modules/sd-forms";

export const C09ListViewContainer = () => {
	const c09 = useContext(C09Context);
	const { loadList } = c09;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		c09.loadList({
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
				loading={c09.listLoading}
				data={c09.listData}
				itemCount={c09.itemCount}
				loadMoreItems={c09.loadMoreItems}
				isItemLoaded={c09.isItemLoaded}
				RowComponent={C09ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c09.handleItemsRendered}
				error={c09.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C09ListViewContainer.displayName = "C09ListViewContainer";
