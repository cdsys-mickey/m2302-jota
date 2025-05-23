import { C08Context } from "@/contexts/C08/C08Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { C08ListRowContainer } from "./C08ListRowContainer";
import Forms from "@/shared-modules/Forms.mjs";
import ResponsiveLayoutContext from "@/shared-components/responsive/ResponsiveLayoutContext";
import { useMemo } from "react";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import C08 from "@/modules/C08.mjs";

export const C08ListViewContainer = () => {
	const c08 = useContext(C08Context);
	const { loadList } = c08;
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

	const lvTxoDate = useWatch({
		name: "lvTxoDate",
		control: form.control
	})
	const debouncedTxoDate = useDebounceObject(lvTxoDate, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);

	const lvDeliveryEmployee = useWatch({
		name: "lvDeliveryEmployee",
		control: form.control
	})
	const debouncedDeliveryEmployee = useDebounceObject(lvDeliveryEmployee, 300);

	const lvDept = useWatch({
		name: "lvDept",
		control: form.control
	})
	const debouncedDept = useDebounceObject(lvDept, 300);

	const lvTransType = useWatch({
		name: "lvTransType",
		control: form.control
	})
	const debouncedTransType = useDebounceObject(lvTransType, 300);

	useInit(() => {
		c08.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.撥出單號,
				}),
				...C08.transformAsQueryParams({
					txoDate: debouncedTxoDate,
					employee: debouncedEmployee,
					deliveryEmployee: debouncedDeliveryEmployee,
					txiDept: debouncedDept,
					transType: debouncedTransType,
				})
			},
			supressLoading: true,
		});
	}, [debouncedOrder, debouncedTxoDate, debouncedEmployee, debouncedDeliveryEmployee, debouncedDept, debouncedTransType]);

	const { isLgOrUp } = useContext(ResponsiveLayoutContext);

	const _height = useMemo(() => {
		return height ?
			isLgOrUp
				? height - 182
				: height - 232
			: 300;
	}, [height, isLgOrUp])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				loading={c08.listLoading}
				data={c08.listData}
				itemCount={c08.itemCount}
				loadMoreItems={c08.loadMoreItems}
				isItemLoaded={c08.isItemLoaded}
				RowComponent={C08ListRowContainer}
				height={_height}
				handleItemsRendered={c08.handleItemsRendered}
				error={c08.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C08ListViewContainer.displayName = "C08ListViewContainer";
