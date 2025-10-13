import AuthListView from "@/components/AuthListView/AuthListView";
import { P34Context } from "@/modules/P34/P34Context";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { P34ListRowContainer } from "./P34ListRowContainer";

export const P34ListViewContainer = () => {
	const p34 = useContext(P34Context);
	const { loadList } = p34;
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
		p34.loadList();
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
				loading={p34.listLoading}
				data={p34.listData}
				itemCount={p34.itemCount}
				loadMoreItems={p34.loadMoreItems}
				isItemLoaded={p34.isItemLoaded}
				RowComponent={P34ListRowContainer}
				height={_height}
				handleItemsRendered={p34.handleItemsRendered}
				error={p34.listError}
				// bottomReached={p34.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

P34ListViewContainer.displayName = "P34ListViewContainer";

