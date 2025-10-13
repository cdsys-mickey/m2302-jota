import AuthListView from "@/components/AuthListView/AuthListView";
import { A05Context } from "@/modules/A05/A05Context";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { A05ListRowContainer } from "./A05ListRowContainer";

export const A05ListViewContainer = () => {
	const a05 = useContext(A05Context);
	const { loadList } = a05;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);
	// const { scrollOffset, onScroll } = useReactWindowScroll({ debounce: 20 });

	useInit(() => {
		a05.loadList();
	}, []);

	useChangeTracking(() => {
		console.log(`debouncedQs: ${debouncedQs}`);
		if (debouncedQs !== undefined) {
			const values = getValues();
			loadList({
				params: { ...values, qs: debouncedQs },
				supressLoading: true,
			});
			setValue("qs", debouncedQs);
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
				loading={a05.listLoading}
				data={a05.listData}
				itemCount={a05.itemCount}
				loadMoreItems={a05.loadMoreItems}
				isItemLoaded={a05.isItemLoaded}
				RowComponent={A05ListRowContainer}
				height={_height}
				handleItemsRendered={a05.handleItemsRendered}
				error={a05.listError}
				// bottomReached={a05.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

A05ListViewContainer.displayName = "A05ListViewContainer";
