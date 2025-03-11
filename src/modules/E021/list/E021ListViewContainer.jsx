import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { E021ListRowContainer } from "./E021ListRowContainer";
import { E021Context } from "@/modules/E021/E021Context";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import E021 from "@/modules/E021/E021.mjs";
import { useMemo } from "react";

export const E021ListViewContainer = () => {
	const e021 = useContext(E021Context);
	const { loadList } = e021;
	const form = useFormContext();
	// const { getValues, setValue } = form;
	const { height } = useWindowSize();

	const q = useWatch({
		name: "q",
		control: form.control,
	});
	const salesDate = useWatch({
		name: "lvSalesDate",
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
		e021.loadList();
	}, []);

	useChangeTracking(() => {
		loadList({
			params: E021.transformAsQueryParams({
				q,
				salesDate,
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
	}, [q, salesDate, arrDate, squared, salesType, cust, custName, compTel, employee]);

	const _height = useMemo(() => {
		return height ? height - 236 : 300
	}, [height])

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={e021.listLoading}
				data={e021.listData}
				itemCount={e021.itemCount}
				loadMoreItems={e021.loadMoreItems}
				isItemLoaded={e021.isItemLoaded}
				RowComponent={E021ListRowContainer}
				height={_height}
				handleItemsRendered={e021.handleItemsRendered}
				error={e021.listError}
				// bottomReached={e021.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

E021ListViewContainer.displayName = "E021ListViewContainer";



