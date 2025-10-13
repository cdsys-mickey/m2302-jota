import AuthListView from "@/components/AuthListView/AuthListView";
import { P35Context } from "@/modules/P35/P35Context";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { P35ListRowContainer } from "./P35ListRowContainer";

export const P35ListViewContainer = () => {
	const p35 = useContext(P35Context);
	const { loadList } = p35;
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
		p35.loadList();
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
				loading={p35.listLoading}
				data={p35.listData}
				itemCount={p35.itemCount}
				loadMoreItems={p35.loadMoreItems}
				isItemLoaded={p35.isItemLoaded}
				RowComponent={P35ListRowContainer}
				height={_height}
				handleItemsRendered={p35.handleItemsRendered}
				error={p35.listError}
				// bottomReached={p35.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

P35ListViewContainer.displayName = "P35ListViewContainer";


