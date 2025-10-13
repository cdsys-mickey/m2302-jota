import AuthListView from "@/components/AuthListView/AuthListView";
import { D05Context } from "@/contexts/D05/D05Context";
import D05 from "@/modules/D05.mjs";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { D05ListRowContainer } from "./D05ListRowContainer";

export const D05ListViewContainer = () => {
	const d05 = useContext(D05Context);
	const { loadList } = d05;
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
		d05.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.報廢單號,
				}),
				...D05.transformAsQueryParams({
					...(debouncedEmployee && {
						employee: debouncedEmployee
					}),
					...(debouncedDate && {
						wdate: debouncedDate
					}),
				}),
			},
			supressLoading: true,
		});
	}, [debouncedOrder, debouncedDate, debouncedEmployee]);

	const _height = useMemo(() => {
		return height ? height - 200 : 300;
	}, [height])

	return (
		<ListViewBox withHeader>
			<AuthListView
				loading={d05.listLoading}
				data={d05.listData}
				itemCount={d05.itemCount}
				loadMoreItems={d05.loadMoreItems}
				isItemLoaded={d05.isItemLoaded}
				RowComponent={D05ListRowContainer}
				height={_height}
				handleItemsRendered={d05.handleItemsRendered}
				error={d05.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D05ListViewContainer.displayName = "D05ListViewContainer";

