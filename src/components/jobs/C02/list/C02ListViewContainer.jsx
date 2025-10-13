import AuthListView from "@/components/AuthListView/AuthListView";
import { C02Context } from "@/contexts/C02/C02Context";
import C02 from "@/modules/C02.mjs";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { C02ListRowContainer } from "./C02ListRowContainer";

export const C02ListViewContainer = () => {
	const c02 = useContext(C02Context);
	const { loadList } = c02;
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

	const lvDate = useWatch({
		name: "lvDate",
		contorl: form.control
	})
	const debouncedDate = useDebounceObject(lvDate, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		contorl: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);

	const checker = useWatch({
		name: "listMode",
		control: form.control,
	});
	const debouncedChecker = useDebounceObject(checker, 300);

	const lvPdline = useWatch({
		name: "lvPdline",
		control: form.control
	})
	const debouncedPdline = useDebounceObject(lvPdline, 300);


	useInit(() => {
		c02.loadList({
			params: {
				ck: checker?.id || "",
			},
		});
	}, []);

	useChangeTracking(() => {
		// if (debouncedQ !== undefined) {
		// const values = getValues();
		console.log("checker:", checker);
		loadList({
			params: {
				// q: debouncedQ, 
				ck: checker?.id || "",
				...(C02.transformAsQueryParams({
					order: debouncedOrder,
					date: debouncedDate,
					pdline: debouncedPdline,
					employee: debouncedEmployee
				}))
			},
			supressLoading: true,
		});
		// setValue("q", debouncedQ);
		// }
	}, [debouncedChecker, debouncedOrder, debouncedDate, debouncedPdline, debouncedEmployee]);

	const _height = useMemo(() => {
		return height ? height - 200 : 300
	}, [height])


	return (
		<ListViewBox withHeader>
			<AuthListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={c02.listLoading}
				data={c02.listData}
				itemCount={c02.itemCount}
				loadMoreItems={c02.loadMoreItems}
				isItemLoaded={c02.isItemLoaded}
				RowComponent={C02ListRowContainer}
				height={_height}
				handleItemsRendered={c02.handleItemsRendered}
				error={c02.listError}
				// bottomReached={c02.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C02ListViewContainer.displayName = "C02ListViewContainer";
