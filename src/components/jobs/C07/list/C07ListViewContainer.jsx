import { C07Context } from "@/contexts/C07/C07Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { C07ListRowContainer } from "./C07ListRowContainer";
import { useMemo } from "react";
import ResponsiveLayoutContext from "@/shared-components/responsive/ResponsiveLayoutContext";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import C07 from "@/modules/md-c07";

export const C07ListViewContainer = () => {
	const c07 = useContext(C07Context);
	const { loadList } = c07;
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
		c07.loadList({
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
				...C07.transformAsQueryParams({
					...(debouncedEmployee && {
						employee: debouncedEmployee,
					}),
					...(debouncedOrdDate && {
						ordDate: debouncedOrdDate,
					}),
					...(debouncedArrDate && {
						arrDate: debouncedArrDate,
					}),
					...(debouncedSquared && {
						squared: debouncedSquared,
					}),
					...(debouncedDept && {
						ordDept: debouncedDept
					})
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
				: height - 222
			: 300;
	}, [height, isLgOrUp])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				loading={c07.listLoading}
				data={c07.listData}
				itemCount={c07.itemCount}
				loadMoreItems={c07.loadMoreItems}
				isItemLoaded={c07.isItemLoaded}
				RowComponent={C07ListRowContainer}
				height={_height}
				handleItemsRendered={c07.handleItemsRendered}
				error={c07.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C07ListViewContainer.displayName = "C07ListViewContainer";
