import AuthListView from "@/components/AuthListView/AuthListView";
import { D02Context } from "@/contexts/D02/D02Context";
import D02 from "@/modules/D02.mjs";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { D02ListRowContainer } from "./D02ListRowContainer";

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
			? height - 200
			: 300;
	}, [height])


	return (
		<ListViewBox withHeader>
			<AuthListView
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
