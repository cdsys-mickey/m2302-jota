import AuthListView from "@/components/AuthListView/AuthListView";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ZA03ListRowContainer } from "./ZA03ListRowContainer";

export const ZA03ListViewContainer = () => {
	const za03 = useContext(ZA03Context);
	const { loadList } = za03;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "q",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		za03.loadList();
	}, []);

	// useEffect(() => {
	// 	console.log(`debouncedQs: ${debouncedQs}`);
	// 	if (debouncedQs !== undefined) {
	// 		const values = getValues();
	// 		loadList({
	// 			params: { ...values, q: debouncedQs },
	// 			supressLoading: true,
	// 		});
	// 		setValue("q", debouncedQs);
	// 	}
	// }, [debouncedQs, getValues, loadList, setValue]);

	useChangeTracking(() => {
		if (debouncedQs !== undefined) {
			const values = getValues();
			loadList({
				params: { ...values, q: debouncedQs },
				supressLoading: true,
			});
			// setValue("q", debouncedQs);
		}
	}, [debouncedQs]);

	const _height = useMemo(() => {
		return height ? height - 162 : 300
	}, [height])

	return (
		<ListViewBox withHeader>
			<AuthListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={za03.listLoading}
				data={za03.listData}
				itemCount={za03.itemCount}
				loadMoreItems={za03.loadMoreItems}
				isItemLoaded={za03.isItemLoaded}
				RowComponent={ZA03ListRowContainer}
				height={_height}
				handleItemsRendered={za03.handleItemsRendered}
				error={za03.listError}
				// bottomReached={za03.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

ZA03ListViewContainer.displayName = "ZA03ListViewContainer";
