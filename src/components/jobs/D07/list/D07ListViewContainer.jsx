import { D07Context } from "@/contexts/D07/D07Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { D07ListRowContainer } from "./D07ListRowContainer";
import Forms from "../../../../shared-modules/Forms.mjs";
import D07 from "@/modules/md-d07";
import useDebounceObject from "@/shared-hooks/useDebounceObject";
import { useMemo } from "react";

export const D07ListViewContainer = () => {
	const d07 = useContext(D07Context);
	const { loadList } = d07;
	const form = useFormContext();
	const { height } = useWindowSize();

	const q = useWatch({
		name: "q",
		control: form.control,
	});
	const debouncedQ = useDebounce(q, 300);

	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})
	const debouncedEmployee = useDebounceObject(lvEmployee, 300);

	useInit(() => {
		d07.loadList({
			params: {},
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				q: debouncedQ,
				...D07.transformAsQueryParams({
					employee: debouncedEmployee
				})
			},
			supressLoading: true,
		});
	}, [debouncedQ, debouncedEmployee]);

	const _height = useMemo(() => {
		return height
			? height - 182
			: 300;
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={d07.listLoading}
				data={d07.listData}
				itemCount={d07.itemCount}
				loadMoreItems={d07.loadMoreItems}
				isItemLoaded={d07.isItemLoaded}
				RowComponent={D07ListRowContainer}
				height={_height}
				handleItemsRendered={d07.handleItemsRendered}
				error={d07.listError}
				// bottomReached={d07.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

D07ListViewContainer.displayName = "D07ListViewContainer";


