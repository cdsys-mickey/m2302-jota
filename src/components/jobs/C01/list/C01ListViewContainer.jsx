import { C01Context } from "@/contexts/C01/C01Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import Forms from "@/shared-modules/sd-forms";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { C01ListRowContainer } from "./C01ListRowContainer";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import C01 from "@/modules/md-c01";
import { useMemo } from "react";

export const C01ListViewContainer = () => {
	const c01 = useContext(C01Context);
	// const listLoader = useContext(CrudContext);
	// const listLoaderCtx = useContext(InfiniteLoaderContext);
	const { loadList } = c01;
	const form = useFormContext();
	const { height } = useWindowSize();

	// const q = useWatch({
	// 	name: "q",
	// 	control: form.control,
	// });
	// const debouncedQ = useDebounce(q, 300);

	const lvOrderFlag = useWatch({
		name: "listMode",
		control: form.control,
	});
	const debouncedOrderFlag = useDebounceObject(lvOrderFlag, 300);

	const lvOrder = useWatch({
		name: "lvOrder",
		control: form.control,
	});
	const debouncedOrder = useDebounceObject(lvOrder, 300);

	const lvDate = useWatch({
		name: "lvDate",
		control: form.control,
	});
	const debouncedDate = useDebounceObject(lvDate, 300);

	const lvPdline = useWatch({
		name: "lvPdline",
		control: form.control
	})
	const debouncedPdline = useDebounceObject(lvPdline, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);


	useInit(() => {
		loadList({
			params: {
				// paramsRef 是進階搜尋才需要
				// ...listLoaderCtx.paramsRef.current,
				ck: 2, // 都是已審核
				// of: orderFlag?.id,
				of: debouncedOrderFlag?.id,
			},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// paramsRef 是進階搜尋才需要
				// ...listLoaderCtx.paramsRef.current,
				// q: debouncedQ,
				ck: 2, // 都是已審核
				// of: orderFlag?.id,
				...C01.transformAsQueryParams({
					orderFlag: debouncedOrderFlag,
					order: debouncedOrder,
					date: debouncedDate,
					pdline: debouncedPdline,
					employee: debouncedEmployee
				})
			},
			supressLoading: true,
		});
		// eslint-disable-next-line no-undef
	}, [debouncedOrderFlag, debouncedOrder, debouncedDate, debouncedPdline, debouncedEmployee]);

	const _height = useMemo(() => {
		return height ?
			height - 182
			: 300;
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={c01.listLoading}
				data={c01.listData}
				itemCount={c01.itemCount}
				loadMoreItems={c01.loadMoreItems}
				isItemLoaded={c01.isItemLoaded}
				RowComponent={C01ListRowContainer}
				height={_height}
				handleItemsRendered={c01.handleItemsRendered}
				error={c01.listError}
				// bottomReached={c01.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C01ListViewContainer.displayName = "C01ListViewContainer";
