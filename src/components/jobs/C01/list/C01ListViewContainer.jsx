import InfiniteListView from "@/shared-components/listview/infinite-listview/InfiniteListView";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "@/shared-components/listview/ListViewBox";
import { C01ListRowContainer } from "./C01ListRowContainer";
import { C01Context } from "@/contexts/C01/C01Context";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import CrudContext from "../../../../contexts/crud/CrudContext";

export const C01ListViewContainer = () => {
	const c01 = useContext(C01Context);
	const crud = useContext(CrudContext);
	const { loadList } = c01;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const q = useWatch({
		name: "q",
		control: form.control,
	});

	const orderFlag = useWatch({
		name: "listMode",
		control: form.control,
	});

	const debouncedQ = useDebounce(q, 300);

	useInit(() => {
		loadList({
			params: {
				...crud.paramsRef.current,
				ck: 2, // 都是已審核
				of: orderFlag?.id,
			},
		});
	}, []);

	useChangeTracking(() => {
		console.log("orderFlag:", orderFlag);
		loadList({
			params: {
				...crud.paramsRef.current,
				q: debouncedQ,
				ck: 2,
				of: orderFlag?.id,
			},
			supressLoading: true,
		});
	}, [debouncedQ, orderFlag]);

	return (
		<ListViewBox withHeader>
			<InfiniteListView
				// onScroll={onScroll}
				// scrollOffset={scrollOffset}
				loading={c01.listLoading}
				data={c01.listData}
				itemCount={c01.itemCount}
				loadMoreItems={c01.loadMoreItems}
				isItemLoaded={c01.isItemLoaded}
				RowComponent={C01ListRowContainer}
				height={height ? height - 142 : 300}
				handleItemsRendered={c01.handleItemsRendered}
				error={c01.listError}
				// bottomReached={c01.bottomReached}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

C01ListViewContainer.displayName = "C01ListViewContainer";
