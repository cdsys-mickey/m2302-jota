import { D05Context } from "@/contexts/D05/D05Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { D05ListRowContainer } from "./D05ListRowContainer";
import Forms from "@/shared-modules/sd-forms";

export const D05ListViewContainer = () => {
	const d05 = useContext(D05Context);
	const { loadList } = d05;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		d05.loadList({
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
				loading={d05.listLoading}
				data={d05.listData}
				itemCount={d05.itemCount}
				loadMoreItems={d05.loadMoreItems}
				isItemLoaded={d05.isItemLoaded}
				RowComponent={D05ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={d05.handleItemsRendered}
				error={d05.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D05ListViewContainer.displayName = "D05ListViewContainer";
