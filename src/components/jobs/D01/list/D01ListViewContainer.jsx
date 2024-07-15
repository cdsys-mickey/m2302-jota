import { D01Context } from "@/contexts/D01/D01Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { D01ListRowContainer } from "./D01ListRowContainer";
import Forms from "../../../../shared-modules/sd-forms";

export const D01ListViewContainer = () => {
	const d01 = useContext(D01Context);
	const { loadList } = d01;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		d01.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				q: debouncedQ,
				...(d01.expProd && {
					prdi: d01.expProd?.ProdID,
				}),
				...(d01.expDate && {
					expd: Forms.formatDate(d01.expDate),
				}),
			},
			supressLoading: true,
		});
	}, [debouncedQ, d01.expProd, d01.expDate]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={d01.listLoading}
				data={d01.listData}
				itemCount={d01.itemCount}
				loadMoreItems={d01.loadMoreItems}
				isItemLoaded={d01.isItemLoaded}
				RowComponent={D01ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={d01.handleItemsRendered}
				error={d01.listError}
				// bottomReached={d01.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D01ListViewContainer.displayName = "D01ListViewContainer";
