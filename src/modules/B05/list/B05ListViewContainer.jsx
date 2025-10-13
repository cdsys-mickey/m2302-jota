import AuthListView from "@/components/AuthListView/AuthListView";
import { B05Context } from "@/modules/B05/B05Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import B05 from "../B05.mjs";
import { B05ListRowContainer } from "./B05ListRowContainer";

export const B05ListViewContainer = () => {
	const b05 = useContext(B05Context);
	const { loadList } = b05;
	const form = useFormContext();
	const { height } = useWindowSize();

	const qs = useWatch({
		name: "q",
		control: form.control,
	});
	const debouncedQs = useDebounce(qs, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})
	const debouncedEmployee = useDebounce(lvEmployee, 300);

	const lvSupplier = useWatch({
		name: "lvSupplier",
		control: form.control
	})
	const debouncedSupplier = useDebounce(lvSupplier, 300);

	const lvDate = useWatch({
		name: "lvDate",
		control: form.control
	})
	const debouncedDate = useDebounce(lvDate, 300);

	useInit(() => {
		b05.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				q: debouncedQs,
				...B05.transformAsQueryParams({
					lvEmployee: debouncedEmployee,
					lvSupplier: debouncedSupplier,
					lvDate: debouncedDate
				})
			},
			supressLoading: true,
		});
	}, [debouncedQs, debouncedEmployee, debouncedSupplier, debouncedDate]);

	const _height = useMemo(() => {
		return height ? height - 180 : 300;
	}, [height])

	return (
		<ListViewBox withHeader>
			<AuthListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b05.listLoading}
				data={b05.listData}
				itemCount={b05.itemCount}
				loadMoreItems={b05.loadMoreItems}
				isItemLoaded={b05.isItemLoaded}
				RowComponent={B05ListRowContainer}
				height={_height}
				handleItemsRendered={b05.handleItemsRendered}
				error={b05.listError}
				// bottomReached={b05.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

B05ListViewContainer.displayName = "B05ListViewContainer";
