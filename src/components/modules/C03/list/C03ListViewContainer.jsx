import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { C03ListRowContainer } from "./C03ListRowContainer";
import { C03Context } from "@/contexts/C03/C03Context";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import C03 from "../../../../modules/md-c03";
import { useMemo } from "react";

export const C03ListViewContainer = () => {
	const c03 = useContext(C03Context);
	const { loadList } = c03;
	const form = useFormContext();
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const listMode = useWatch({
		name: "listMode",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		loadList({
			params: {
				ck: 1,
				rs: 1,
			},
		});
	}, []);

	const memoisedCk = useMemo(() => {
		if (listMode?.id === C03.ListModes.NOT_REVIEWED) {
			return 1;
		} else if (listMode?.id === C03.ListModes.REVIEWED) {
			return 2;
		}
		return null;
	}, [listMode?.id]);

	const memoisedRs = useMemo(() => {
		if (listMode?.id === C03.ListModes.NOT_REVIEWED) {
			return 1;
		}
		return null;
	}, [listMode?.id]);

	useChangeTracking(() => {
		loadList({
			params: {
				q: debouncedQ,
				...(memoisedCk && {
					ck: memoisedCk,
				}),
				...(memoisedRs && {
					rs: memoisedRs,
				}),
				// ...(listMode.id === C03.ListModes.NOT_REVIEWED && {
				// 	ck: 1,
				// 	rs: 1,
				// }),
				// ...(listMode.id === C03.ListModes.REVIEWED && {
				// 	ck: 2,
				// }),
			},
			supressLoading: true,
		});
	}, [debouncedQ, memoisedCk]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={c03.listLoading}
				data={c03.listData}
				itemCount={c03.itemCount}
				loadMoreItems={c03.loadMoreItems}
				isItemLoaded={c03.isItemLoaded}
				RowComponent={C03ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c03.handleItemsRendered}
				error={c03.listError}
				// bottomReached={c03.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C03ListViewContainer.displayName = "C03ListViewContainer";
