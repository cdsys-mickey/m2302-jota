import { C05Context } from "@/contexts/C05/C05Context";
import C05 from "@/modules/md-c05";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import ResponsiveLayoutContext from "@/shared-components/responsive/ResponsiveLayoutContext";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { C05ListRowContainer } from "./C05ListRowContainer";
import AuthListView from "@/components/AuthListView/AuthListView";

export const C05ListViewContainer = () => {
	const c05 = useContext(C05Context);
	const { loadList } = c05;
	const form = useFormContext();
	const { height } = useWindowSize();

	const { isLgOrUp } = useContext(ResponsiveLayoutContext);

	const _height = useMemo(() => {
		console.log("isLgOrUp", isLgOrUp)
		return height ?
			isLgOrUp
				? height - 200
				: height - 250
			: 300;
	}, [height, isLgOrUp])

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

	const lvSupplier = useWatch({
		name: "lvSupplier",
		control: form.control
	})
	const debouncedSupplier = useDebounceObject(lvSupplier, 300);

	const rd = useWatch({
		name: "rd",
		control: form.control
	})
	const debouncedRtnDate = useDebounceObject(rd, 300);

	const rd2 = useWatch({
		name: "rd2",
		control: form.control
	})
	const debouncedRtnDate2 = useDebounceObject(rd2, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);


	useInit(() => {
		c05.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.退貨單號,
				}),
				...C05.transformAsQueryParams({
					...(debouncedSupplier && {
						supplier: debouncedSupplier
					}),
					...(debouncedRtnDate && {
						rd: debouncedRtnDate
					}),
					...(debouncedRtnDate2 && {
						rd2: debouncedRtnDate2
					}),
					...(debouncedEmployee && {
						employee: debouncedEmployee
					}),
				})
			},
			supressLoading: true,
		});
	}, [debouncedOrder, debouncedSupplier, debouncedRtnDate, debouncedRtnDate2, debouncedEmployee]);



	return (
		<ListViewBox withHeader>
			<AuthListView
				loading={c05.listLoading}
				data={c05.listData}
				itemCount={c05.itemCount}
				loadMoreItems={c05.loadMoreItems}
				isItemLoaded={c05.isItemLoaded}
				RowComponent={C05ListRowContainer}
				height={_height}
				handleItemsRendered={c05.handleItemsRendered}
				error={c05.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C05ListViewContainer.displayName = "C05ListViewContainer";
