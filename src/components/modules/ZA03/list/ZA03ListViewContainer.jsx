import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { ZA03ListRowContainer } from "./ZA03ListRowContainer";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03ListViewContainer = () => {
	const users = useContext(ZA03Context);
	const { loadList } = users;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		users.loadList();
	}, []);

	useEffect(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		if (debouncedQs !== undefined) {
			const values = getValues();
			loadList({ params: { ...values, qs: debouncedQs } });
			setValue("qs", debouncedQs);
		}
	}, [debouncedQs, getValues, loadList, setValue]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={users.listLoading}
				data={users.listData}
				itemCount={users.itemCount}
				loadMoreItems={users.loadMoreItems}
				isItemLoaded={users.isItemLoaded}
				RowComponent={ZA03ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={users.handleItemsRendered}
				error={users.listError}
				// bottomReached={users.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

ZA03ListViewContainer.displayName = "ZA03ListViewContainer";
