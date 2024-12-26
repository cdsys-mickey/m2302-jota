import { E01Context } from "@/contexts/E01/E01Context";
import E01 from "@/modules/md-e01";
import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { E01ListRowContainer } from "./E01ListRowContainer";

export const E01ListViewContainer = () => {
	const e01 = useContext(E01Context);
	const { loadList } = e01;
	const form = useFormContext();
	// const { getValues, setValue } = form;
	const { height } = useWindowSize();

	const q = useWatch({
		name: "q",
		control: form.control,
	});
	const ordDate = useWatch({
		name: "lvOrdDate",
		control: form.control,
	});
	const arrDate = useWatch({
		name: "lvArrDate",
		control: form.control,
	});
	const squared = useWatch({
		name: "lvSquared",
		control: form.control,
	});

	const salesType = useWatch({
		name: "lvSalesType",
		control: form.control,
	});
	const retail = useWatch({
		name: "lvRetail",
		control: form.control,
	});
	const cust = useWatch({
		name: "lvCust",
		control: form.control,
	});
	const custName = useWatch({
		name: "lvCustName",
		control: form.control,
	});

	const compTel = useWatch({
		name: "lvCompTel",
		control: form.control,
	});
	const employee = useWatch({
		name: "lvEmployee",
		control: form.control,
	});

	useInit(() => {
		e01.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: E01.transformAsQueryParams({
				q,
				ordDate,
				arrDate,
				squared,
				salesType,
				cust,
				custName,
				compTel,
				employee
			}),
			supressLoading: true,
		});
	}, [q, ordDate, arrDate, squared, salesType, cust, custName, compTel, employee]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={e01.listLoading}
				data={e01.listData}
				itemCount={e01.itemCount}
				loadMoreItems={e01.loadMoreItems}
				isItemLoaded={e01.isItemLoaded}
				RowComponent={E01ListRowContainer}
				height={height ? height - 232 : 300}
				handleItemsRendered={e01.handleItemsRendered}
				error={e01.listError}
				// bottomReached={e01.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

E01ListViewContainer.displayName = "E01ListViewContainer";


