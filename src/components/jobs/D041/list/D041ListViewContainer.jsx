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
import Forms from "../../../../shared-modules/Forms.mjs";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import D041 from "@/modules/D041.mjs";
import { useMemo } from "react";

export const D041ListViewContainer = () => {
	const d041 = useContext(D041Context);
	const { loadList } = d041;
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
		d041.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.入庫單號,
				}),
				...D041.transformAsQueryParams({
					...(debouncedEmployee && {
						employee: debouncedEmployee
					}),
					...(debouncedDate && {
						sdate: debouncedDate
					}),
					...(debouncedPdline && {
						pdline: debouncedPdline
					}),
				}),
				...(d041.expProd && {
					prdi: d041.expProd?.ProdID,
				}),
				...(d041.expDate && {
					expd: Forms.formatDate(d041.expDate),
				}),
			},
			supressLoading: true,
		});
	}, [debouncedOrder, debouncedDate, debouncedEmployee, debouncedPdline, d041.expProd, d041.expDate]);

	const _height = useMemo(() => {
		return height
			? height - 200
			: 300;
	}, [height])

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
				height={_height}
				handleItemsRendered={d041.handleItemsRendered}
				error={d041.listError}
				// bottomReached={d041.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D041ListViewContainer.displayName = "D041ListViewContainer";
