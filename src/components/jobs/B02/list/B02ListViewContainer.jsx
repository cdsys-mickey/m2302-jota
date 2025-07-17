import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { B02ListRowContainer } from "./B02ListRowContainer";
import { B02Context } from "@/contexts/B02/B02Context";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import B02 from "@/modules/md-b02";
import { BContext } from "@/contexts/B/BContext";
import { B04Context } from "@/contexts/B04/B04Context";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useMemo } from "react";

export const B02ListViewContainer = () => {
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
	const { loadList } = b02;
	const form = useFormContext();
	const { height } = useWindowSize();

	const formValues = useWatch({
		control: form.control,
	});

	const debouncedFormValues = useDebounceObject(
		formValues
		, 300);

	useInit(() => {
		b02.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: B02.transformAsQueryParams(debouncedFormValues),
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
				loading={b02.listLoading}
				data={b02.listData}
				itemCount={b02.itemCount}
				loadMoreItems={b02.loadMoreItems}
				isItemLoaded={b02.isItemLoaded}
				RowComponent={B02ListRowContainer}
				height={_height}
				handleItemsRendered={b02.handleItemsRendered}
				error={b02.listError}
				// bottomReached={b02.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B02ListViewContainer.displayName = "B02ListViewContainer";


