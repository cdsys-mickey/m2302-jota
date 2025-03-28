import { D02Context } from "@/contexts/D02/D02Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { D02ListRowContainer } from "./D02ListRowContainer";
import Forms from "../../../../shared-modules/Forms.mjs";
import { useMemo } from "react";
import D02 from "@/modules/D02.mjs";
import useDebounceObject from "@/shared-hooks/useDebounceObject";

export const D02ListViewContainer = () => {
	const d02 = useContext(D02Context);
	const { loadList } = d02;
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

	const lvPdline = useWatch({
		name: "lvPdline",
		control: form.control
	})
	const debouncedPdline = useDebounceObject(lvPdline, 300);

	useInit(() => {
		d02.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.退料單號,
				}),
				...D02.transformAsQueryParams({
					...(debouncedEmployee && {
						employee: debouncedEmployee
					}),
					...(debouncedDate && {
						rdate: debouncedDate
					}),
					...(debouncedPdline && {
						pdline: debouncedPdline
					}),
				}),
			},
			supressLoading: true,
		});
	}, [debouncedOrder, debouncedDate, debouncedEmployee, debouncedPdline]);

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
				loading={d02.listLoading}
				data={d02.listData}
				itemCount={d02.itemCount}
				loadMoreItems={d02.loadMoreItems}
				isItemLoaded={d02.isItemLoaded}
				RowComponent={D02ListRowContainer}
				height={_height}
				handleItemsRendered={d02.handleItemsRendered}
				error={d02.listError}
				// bottomReached={d02.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D02ListViewContainer.displayName = "D02ListViewContainer";
