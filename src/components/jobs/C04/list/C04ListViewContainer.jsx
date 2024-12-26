import { C04Context } from "@/contexts/C04/C04Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { C04ListRowContainer } from "./C04ListRowContainer";
import Forms from "@/shared-modules/sd-forms";
import ResponsiveLayoutContext from "@/shared-components/responsive/ResponsiveLayoutContext";
import { useMemo } from "react";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import C04 from "@/modules/md-c04";

export const C04ListViewContainer = () => {
	const c04 = useContext(C04Context);
	const { loadList } = c04;
	const form = useFormContext();
	const { height } = useWindowSize();

	useInit(() => {
		c04.loadList({
			params: {},
		});
	}, []);

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

	const lvRstDate = useWatch({
		name: "lvRstDate",
		contorl: form.control
	})
	const debouncedRstDate = useDebounceObject(lvRstDate, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		contorl: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);

	const lvSupplier = useWatch({
		name: "lvSupplier",
		contorl: form.control
	})
	const debouncedSupplier = useDebounceObject(lvSupplier, 300);

	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.進貨單號,
				}),
				...(c04.expProd && {
					pd: c04.expProd?.ProdID,
				}),
				...(c04.expDate && {
					ed: Forms.formatDate(c04.expDate),
				}),
				...(C04.transformAsQueryParams({
					rstDate: debouncedRstDate,
					employee: debouncedEmployee,
					supplier: debouncedSupplier,
				}))
			},
			supressLoading: true,
		});
	}, [debouncedOrder, c04.expProd, c04.expDate, debouncedRstDate, debouncedEmployee, debouncedSupplier]);

	const { isLgOrUp } = useContext(ResponsiveLayoutContext);

	const _height = useMemo(() => {
		return height ?
			isLgOrUp
				? height - 182
				: height - 182
			: 300;
	}, [height, isLgOrUp])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={c04.listLoading}
				data={c04.listData}
				itemCount={c04.itemCount}
				loadMoreItems={c04.loadMoreItems}
				isItemLoaded={c04.isItemLoaded}
				RowComponent={C04ListRowContainer}
				height={_height}
				handleItemsRendered={c04.handleItemsRendered}
				error={c04.listError}
				// bottomReached={c04.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C04ListViewContainer.displayName = "C04ListViewContainer";
