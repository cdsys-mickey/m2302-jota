import AuthListView from "@/components/AuthListView/AuthListView";
import { P41Context } from "@/modules/P41/P41Context";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import P41 from "../P41.mjs";
import { P41ListRowContainer } from "./P41ListRowContainer";
import { ResponsiveProvider } from "@/shared-contexts/responsive/ResponsiveProvider";
import ResponsiveGridProvider from "@/shared-components/responsive-grid/ResponsiveGridProvider";

export const P41ListViewContainer = () => {
	const p41 = useContext(P41Context);
	const { loadList } = p41;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const lvArrDate = useWatch({
		name: "lvArrDate",
		control: form.control
	})

	const lvOrdDate = useWatch({
		name: "lvOrdDate",
		control: form.control
	})

	const lvFilterMode = useWatch({
		name: "lvFilterMode",
		control: form.control
	})

	const lvArrDateDir = useWatch({
		name: "lvArrDateDir",
		control: form.control
	})

	const debouncedQs = useDebounce(qs, 300);
	// const { scrollOffset, onScroll } = useReactWindowScroll({ debounce: 20 });

	useInit(() => {
		p41.loadList({
			params: P41.transformAsQueryParams(P41.getDefaultValues())
		});
	}, []);

	useChangeTracking(() => {
		loadList({
			params: P41.transformAsQueryParams({
				qs: debouncedQs,
				lvOrdDate,
				lvArrDate,
				lvFilterMode,
				lvArrDateDir
			}),
			supressLoading: true,
		});
	}, [debouncedQs, lvOrdDate, lvArrDate, lvArrDateDir, lvFilterMode]);

	const _height = useMemo(() => {
		return height ? height - 202 : 300
	}, [height])

	return (
		<ResponsiveGridProvider>
			<ListViewBox withHeader>
				<AuthListView
					// onScroll={onScroll}
					// scrollOffset={scrollOffset}
					loading={p41.listLoading}
					data={p41.listData}
					itemCount={p41.itemCount}
					loadMoreItems={p41.loadMoreItems}
					isItemLoaded={p41.isItemLoaded}
					RowComponent={P41ListRowContainer}
					height={_height}
					handleItemsRendered={p41.handleItemsRendered}
					error={p41.listError}
					// bottomReached={p41.bottomReached}
					bottomReached={true}
				/>
			</ListViewBox>
		</ResponsiveGridProvider>
	);
};

P41ListViewContainer.displayName = "P41ListViewContainer";



