import { C06Context } from "@/contexts/C06/C06Context";
import C06 from "@/modules/C06.mjs";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import ResponsiveLayoutContext from "@/shared-components/responsive/ResponsiveLayoutContext";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { C06ListRowContainer } from "./C06ListRowContainer";

export const C06ListViewContainer = () => {
	const c06 = useContext(C06Context);
	const { loadList } = c06;
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

	const ordDate = useWatch({
		name: "lvOrdDate",
		control: form.control,
	})
	const debouncedOrdDate = useDebounceObject(ordDate, 300);

	const arrDate = useWatch({
		name: "lvArrDate",
		control: form.control,
	})
	const debouncedArrDate = useDebounceObject(arrDate, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})

	const debouncedEmployee = useDebounceObject(lvEmployee, 300);

	const lvSquared = useWatch({
		name: "lvSquared",
		control: form.control
	})
	const debouncedSquared = useDebounceObject(lvSquared, 300);

	const lvDept = useWatch({
		name: "lvDept",
		control: form.control
	})
	const debouncedDept = useDebounceObject(lvDept, 300);

	useInit(() => {
		c06.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.訂貨單號,
				}),
				...C06.transformAsQueryParams({
					employee: debouncedEmployee,
					orddate: debouncedOrdDate,
					arrdate: debouncedArrDate,
					...(debouncedSquared && {
						squared: debouncedSquared,
					}),
					shdept: debouncedDept
				})
			},
			supressLoading: true,
		});
	}, [debouncedOrder, debouncedEmployee, debouncedOrdDate, debouncedArrDate, debouncedSquared, debouncedDept]);

	const { isLgOrUp } = useContext(ResponsiveLayoutContext);
	const _height = useMemo(() => {
		return height ?
			isLgOrUp
				? height - 182
				: height - 228
			: 300;
	}, [height, isLgOrUp])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				loading={c06.listLoading}
				data={c06.listData}
				itemCount={c06.itemCount}
				loadMoreItems={c06.loadMoreItems}
				isItemLoaded={c06.isItemLoaded}
				RowComponent={C06ListRowContainer}
				height={_height}
				handleItemsRendered={c06.handleItemsRendered}
				error={c06.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C06ListViewContainer.displayName = "C06ListViewContainer";
