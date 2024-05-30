import { C08Context } from "@/contexts/C08/C08Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { C08ListRowContainer } from "./C08ListRowContainer";
import Forms from "@/shared-modules/sd-forms";

export const C08ListViewContainer = () => {
	const c08 = useContext(C08Context);
	const { loadList } = c08;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		c08.loadList({
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
				loading={c08.listLoading}
				data={c08.listData}
				itemCount={c08.itemCount}
				loadMoreItems={c08.loadMoreItems}
				isItemLoaded={c08.isItemLoaded}
				RowComponent={C08ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c08.handleItemsRendered}
				error={c08.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C08ListViewContainer.displayName = "C08ListViewContainer";
