import { D06Context } from "@/contexts/D06/D06Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { D06ListRowContainer } from "./D06ListRowContainer";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import D06 from "@/modules/md-d06";
import { useMemo } from "react";

export const D06ListViewContainer = () => {
	const d06 = useContext(D06Context);
	const { loadList } = d06;
	const form = useFormContext();
	const { height } = useWindowSize();

	// const q = useWatch({
	// 	name: "q",
	// 	control: form.control,
	// });
	// const debouncedQ = useDebounce(q, 300);

	const lvOrder = useWatch({
		name: "lvOrder",
		control: form.control
	})
	const debouncedOrder = useDebounceObject(lvOrder, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);

	const lvDate = useWatch({
		name: "lvDate",
		control: form.control
	})
	const debouncedDate = useDebounceObject(lvDate, 300);

	useInit(() => {
		d06.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.結餘單號,
				}),
				...D06.transformAsQueryParams({
					employee: debouncedEmployee,
					bdate: debouncedDate
				}),
			},
			supressLoading: true,
		});
	}, [debouncedOrder, debouncedDate, debouncedEmployee]);

	const _height = useMemo(() => {
		return height
			? height - 182
			: 300;
	}, [height])


	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={d06.listLoading}
				data={d06.listData}
				itemCount={d06.itemCount}
				loadMoreItems={d06.loadMoreItems}
				isItemLoaded={d06.isItemLoaded}
				RowComponent={D06ListRowContainer}
				height={_height}
				handleItemsRendered={d06.handleItemsRendered}
				error={d06.listError}
				// bottomReached={d06.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D06ListViewContainer.displayName = "D06ListViewContainer";
