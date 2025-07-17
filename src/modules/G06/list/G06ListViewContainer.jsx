import { G06Context } from "@/modules/G06/G06Context";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useReactWindowScroll } from "../../../shared-hooks/react-window/useReactWindowScroll";
import { G06ListRowContainer } from "./G06ListRowContainer";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useMemo } from "react";

export const G06ListViewContainer = () => {
	const g06 = useContext(G06Context);
	const { loadList } = g06;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();

	const session = useWatch({
		name: "lvSession",
		control: form.control
	})
	const debouncedSession = useDebounce(session, 300);

	const cust = useWatch({
		name: "lvCust",
		control: form.control
	})
	const debouncedCust = useDebounce(cust, 300);

	const custName = useWatch({
		name: "lvCustName",
		control: form.control
	})
	const debouncedCustName = useDebounce(custName, 300);

	const _height = useMemo(() => {
		return height ? height - 200 : 300
	}, [height])

	useInit(() => {
		g06.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: {
				...(debouncedSession && {
					ym: debouncedSession.AccYM,
					sess: debouncedSession.Stage
				}),
				...(debouncedCust && {
					csti: debouncedCust.CustID
				}),
				...(debouncedCustName && {
					cstn: debouncedCustName
				})
			},
			supressLoading: true,
		});

	}, [debouncedSession, debouncedCust, debouncedCustName]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={g06.listLoading}
				data={g06.listData}
				itemCount={g06.itemCount}
				loadMoreItems={g06.loadMoreItems}
				isItemLoaded={g06.isItemLoaded}
				RowComponent={G06ListRowContainer}
				height={_height}
				handleItemsRendered={g06.handleItemsRendered}
				error={g06.listError}
				// bottomReached={g06.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

G06ListViewContainer.displayName = "G06ListViewContainer";

