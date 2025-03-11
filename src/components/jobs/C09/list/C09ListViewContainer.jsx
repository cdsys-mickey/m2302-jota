import { C09Context } from "@/contexts/C09/C09Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { C09ListRowContainer } from "./C09ListRowContainer";
import Forms from "@/shared-modules/Forms.mjs";
import { useMemo } from "react";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import C09 from "@/modules/md-c09";

export const C09ListViewContainer = () => {
	const c09 = useContext(C09Context);
	const { loadList } = c09;
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

	const lvTxiDate = useWatch({
		name: "lvTxiDate",
		control: form.control
	})
	const debouncedTxiDate = useDebounceObject(lvTxiDate, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);

	const lvDept = useWatch({
		name: "lvDept",
		control: form.control
	})
	const debouncedDept = useDebounceObject(lvDept, 300);

	useInit(() => {
		c09.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				...(debouncedOrder && {
					q: debouncedOrder?.撥入單號,
				}),
				...C09.transformAsQueryParams({
					txiDate: debouncedTxiDate,
					employee: debouncedEmployee,
					txoDept: debouncedDept,
				})
			},
			supressLoading: true,
		});
	}, [debouncedOrder, debouncedTxiDate, debouncedEmployee, debouncedDept]);

	const _height = useMemo(() => {
		return height ? height - 182 : 300;
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				loading={c09.listLoading}
				data={c09.listData}
				itemCount={c09.itemCount}
				loadMoreItems={c09.loadMoreItems}
				isItemLoaded={c09.isItemLoaded}
				RowComponent={C09ListRowContainer}
				height={_height}
				handleItemsRendered={c09.handleItemsRendered}
				error={c09.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C09ListViewContainer.displayName = "C09ListViewContainer";
