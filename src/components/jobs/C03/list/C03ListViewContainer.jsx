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
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import ResponsiveLayoutContext from "@/shared-components/responsive/ResponsiveLayoutContext";
import Squared2 from "@/modules/md-squared2";

export const C03ListViewContainer = () => {
	const c03 = useContext(C03Context);
	const { loadList } = c03;
	const form = useFormContext();
	const { height } = useWindowSize();


	const lvReviewState = useWatch({
		name: "lvReviewState",
		control: form.control,
	});
	const debouncedReviewState = useDebounceObject(lvReviewState, 300);


	useInit(() => {
		loadList({
			params: {
				ck: C03.ReviewStates.NOT_REVIEWED,
				// rs: 3,
				sq: Squared2.SquaredState.NOT_SQUARED,
			},
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

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);

	const lvOrdDate = useWatch({
		name: "lvOrdDate",
		control: form.control
	})
	const debouncedOrdDate = useDebounceObject(lvOrdDate, 300);

	const lvArrDate = useWatch({
		name: "lvArrDate",
		control: form.control
	})
	const debouncedArrDate = useDebounceObject(lvArrDate, 300);

	const lvSupplier = useWatch({
		name: "lvSupplier",
		control: form.control
	})
	const debouncedSupplier = useDebounceObject(lvSupplier, 300);

	const lvSquared = useWatch({
		name: "lvSquared",
		control: form.control
	})
	const debouncedSquared = useDebounceObject(lvSquared, 300);

	// const memoisedCk = useMemo(() => {
	// 	if (listMode?.id === C03.ListModes.NOT_REVIEWED) {
	// 		return 1;
	// 	} else if (listMode?.id === C03.ListModes.REVIEWED) {
	// 		return 2;
	// 	}
	// 	return null;
	// }, [listMode?.id]);

	// const memoisedRs = useMemo(() => {
	// 	if (listMode?.id === C03.ListModes.NOT_REVIEWED) {
	// 		return 3; // 部分未進貨
	// 	}
	// 	return null;
	// }, [listMode?.id]);

	// const memoisedSq = useMemo(() => {
	// 	if (debouncedSquared?.id) {
	// 		return debouncedSquared?.id
	// 	}
	// 	if (listMode?.id === C03.ListModes.NOT_REVIEWED) {
	// 		return 1;
	// 	}
	// 	return null;
	// }, [debouncedSquared?.id, listMode?.id]);


	useChangeTracking(() => {
		loadList({
			params: {
				// q: debouncedQ,
				...(debouncedOrder && {
					q: debouncedOrder?.採購單號,
				}),
				// ...(debouncedReviewState && {
				// 	ck: debouncedReviewState?.id,
				// }),
				// ...(memoisedRs && {
				// 	rs: memoisedRs,
				// }),
				// ...(debouncedSquared && {
				// 	sq: debouncedSquared?.id,
				// }),
				...C03.transformAsQueryParams({
					employee: debouncedEmployee,
					ordDate: debouncedOrdDate,
					arrDate: debouncedArrDate,
					supplier: debouncedSupplier,
					squared: debouncedSquared,
					reviewState: debouncedReviewState
				})
			},
			supressLoading: true,
		});
	}, [debouncedSquared, debouncedOrder, debouncedReviewState, debouncedOrder, debouncedEmployee, debouncedOrdDate, debouncedArrDate, debouncedSupplier, debouncedOrder]);

	const { isLgOrUp } = useContext(ResponsiveLayoutContext);

	// isLgOrUp 在初始時是 false, 要用比較短的樣式, 才不會有捲軸拉扯的問題
	const _height = useMemo(() => {
		return height ?
			isLgOrUp
				? height - 182
				: height - 228
			: 300;
	}, [height, isLgOrUp])

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
				height={_height}
				handleItemsRendered={c03.handleItemsRendered}
				error={c03.listError}
				// bottomReached={c03.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C03ListViewContainer.displayName = "C03ListViewContainer";
