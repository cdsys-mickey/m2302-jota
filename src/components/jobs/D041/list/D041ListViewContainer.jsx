import { D041Context } from "@/contexts/D041/D041Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { D041ListRowContainer } from "./D041ListRowContainer";
import Forms from "../../../../shared-modules/sd-forms";

export const D041ListViewContainer = () => {
	const d041 = useContext(D041Context);
	const { loadList } = d041;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		d041.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				q: debouncedQ,
				...(d041.expProd && {
					prdi: d041.expProd?.ProdID,
				}),
				...(d041.expDate && {
					expd: Forms.formatDate(d041.expDate),
				}),
			},
			supressLoading: true,
		});
	}, [debouncedQ, d041.expProd, d041.expDate]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={d041.listLoading}
				data={d041.listData}
				itemCount={d041.itemCount}
				loadMoreItems={d041.loadMoreItems}
				isItemLoaded={d041.isItemLoaded}
				RowComponent={D041ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={d041.handleItemsRendered}
				error={d041.listError}
				// bottomReached={d041.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D041ListViewContainer.displayName = "D041ListViewContainer";
