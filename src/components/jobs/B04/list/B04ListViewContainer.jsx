import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { B04ListRowContainer } from "./B04ListRowContainer";
import { B04Context } from "@/contexts/B04/B04Context";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import B04 from "@/modules/md-b04";
import { useMemo } from "react";

export const B04ListViewContainer = () => {
	const b04 = useContext(B04Context);
	const { loadList } = b04;
	const form = useFormContext();
	const { height } = useWindowSize();
	const formValues = useWatch({
		control: form.control,
	});

	const debouncedFormValues = useDebounce(formValues, 300);

	useInit(() => {
		b04.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: B04.transformAsQueryParams(debouncedFormValues),
			supressLoading: true,
		});
	}, [debouncedFormValues]);

	const _height = useMemo(() => {
		return height ? height - 250 : 300
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b04.listLoading}
				data={b04.listData}
				itemCount={b04.itemCount}
				loadMoreItems={b04.loadMoreItems}
				isItemLoaded={b04.isItemLoaded}
				RowComponent={B04ListRowContainer}
				height={_height}
				handleItemsRendered={b04.handleItemsRendered}
				error={b04.listError}
				// bottomReached={b04.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B04ListViewContainer.displayName = "B04ListViewContainer";



