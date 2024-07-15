import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { C02ListRowContainer } from "./C02ListRowContainer";
import { C02Context } from "@/contexts/C02/C02Context";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";

export const C02ListViewContainer = () => {
	const c02 = useContext(C02Context);
	const { loadList } = c02;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const checker = useWatch({
		name: "listMode",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		c02.loadList({
			params: {
				ck: checker?.id || "",
			},
		});
	}, []);

	useChangeTracking(() => {
		// if (debouncedQ !== undefined) {
		// const values = getValues();
		console.log("checker:", checker);
		loadList({
			params: { q: debouncedQ, ck: checker?.id || "" },
			supressLoading: true,
		});
		// setValue("q", debouncedQ);
		// }
	}, [debouncedQ, checker]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={c02.listLoading}
				data={c02.listData}
				itemCount={c02.itemCount}
				loadMoreItems={c02.loadMoreItems}
				isItemLoaded={c02.isItemLoaded}
				RowComponent={C02ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c02.handleItemsRendered}
				error={c02.listError}
				// bottomReached={c02.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C02ListViewContainer.displayName = "C02ListViewContainer";
