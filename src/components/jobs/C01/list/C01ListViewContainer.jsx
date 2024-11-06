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

export const C01ListViewContainer = () => {
	const c01 = useContext(C01Context);
	// const listLoader = useContext(CrudContext);
	// const listLoaderCtx = useContext(InfiniteLoaderContext);
	const { loadList } = c01;
	const form = useFormContext();
	const { height } = useWindowSize();

	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const orderFlag = useWatch({
		name: "listMode",
		control: form.control,
	});

	const reqOrder = useWatch({
		name: "reqOrder",
		control: form.control,
	});

	const date = useWatch({
		name: "date",
		control: form.control,
	});

	const pdline = useWatch({
		name: "pdline",
		control: form.control
	})

	const reqEmployee = useWatch({
		name: "reqEmployee",
		control: form.control
	})

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		loadList({
			params: {
				// paramsRef 是進階搜尋才需要
				// ...listLoaderCtx.paramsRef.current,
				ck: 2, // 都是已審核
				of: orderFlag?.id,
			},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				// paramsRef 是進階搜尋才需要
				// ...listLoaderCtx.paramsRef.current,
				q: debouncedQ,
				ck: 2, // 都是已審核
				of: orderFlag?.id,
				...(reqOrder?.["請購單號"] && {
					rid: reqOrder?.["請購單號"],
				}),
				...(date && {
					dt: Forms.formatDate(date),
				}),
				...(pdline && {
					pdline: pdline.CodeID,
				}),
				...(reqEmployee && {
					rempi: reqEmployee.CodeID,
				}),
			},
			supressLoading: true,
		});
		// eslint-disable-next-line no-undef
	}, [debouncedQ, orderFlag, reqOrder, date, pdline, reqEmployee]);

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
				height={height ? height - 180 : 300}
				handleItemsRendered={c01.handleItemsRendered}
				error={c01.listError}
				// bottomReached={c01.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C01ListViewContainer.displayName = "C01ListViewContainer";
