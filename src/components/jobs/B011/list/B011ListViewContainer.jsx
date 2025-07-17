import { B011Context } from "@/contexts/B011/B011Context";
import B011 from "@/modules/md-b011";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useChangeTracking } from "../../../../shared-hooks/useChangeTracking";
import { B011ListRowContainer } from "./B011ListRowContainer";
import { B031Context } from "@/contexts/B031/B031Context";
import { BContext } from "@/contexts/B/BContext";

export const B011ListViewContainer = (props) => {
	const { forNew = false } = props;
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);
	const { loadList } = b011;
	const form = useFormContext();
	// const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const lvCust = useWatch({
		name: "lvCust",
		control: form.control,
	});

	const lvDate = useWatch({
		name: "lvDate",
		control: form.control,
	});
	const lvEmployee = useWatch({
		name: "lvEmployee",
		control: form.control
	})

	useInit(() => {
		b011.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: B011.transformAsQueryParams({
				lvCust,
				lvDate,
				lvEmployee
			}),
			supressLoading: true,
		});
	}, [lvCust, lvDate, lvEmployee]);

	const _height = useMemo(() => {
		return height ? height - 200 : 300
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={b011.listLoading}
				data={b011.listData}
				itemCount={b011.itemCount}
				loadMoreItems={b011.loadMoreItems}
				isItemLoaded={b011.isItemLoaded}
				RowComponent={B011ListRowContainer}
				height={_height}
				handleItemsRendered={b011.handleItemsRendered}
				error={b011.listError}
				// bottomReached={b011.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};
B011ListViewContainer.propTypes = {
	forNew: PropTypes.bool
}
B011ListViewContainer.displayName = "B011ListViewContainer";

