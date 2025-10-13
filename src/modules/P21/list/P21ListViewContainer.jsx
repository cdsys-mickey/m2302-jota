import AuthListView from "@/components/AuthListView/AuthListView";
import { P21Context } from "@/modules/P21/P21Context";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
import { P21ListRowContainer } from "./P21ListRowContainer";

export const P21ListViewContainer = () => {
	const p21 = useContext(P21Context);
	const { loadList } = p21;
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
		p21.loadList();
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
				loading={p21.listLoading}
				data={p21.listData}
				itemCount={p21.itemCount}
				loadMoreItems={p21.loadMoreItems}
				isItemLoaded={p21.isItemLoaded}
				RowComponent={P21ListRowContainer}
				height={_height}
				handleItemsRendered={p21.handleItemsRendered}
				error={p21.listError}
				// bottomReached={p21.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

P21ListViewContainer.displayName = "P21ListViewContainer";


