import { A01Context } from "@/contexts/A01/A01Context";
import InfiniteListView from "@/shared-components/infinite-listview/InfiniteListView";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import useDebounce from "../../../../shared-hooks/useDebounce";
import { A01ListRowContainer } from "./A01ListRowContainer";

export const A01ListViewContainer = () => {
	const a01 = useContext(A01Context);
	const { loadList } = a01;
	const form = useFormContext();
	const { getValues, setValue } = form;
	const { height } = useWindowSize();
	const qs = useWatch({
		name: "qs",
		control: form.control,
	});

	const debouncedQs = useDebounce(qs, 300);

	useInit(() => {
		a01.loadList();
	}, []);

	// useEffect(() => {
	// 	console.debug(`qs: ${qs}`);
	// }, [qs]);

	useEffect(() => {
		console.debug(`debouncedQs: ${debouncedQs}`);
		const values = getValues();
		loadList({ params: { ...values, qs: debouncedQs } });
		setValue("qs", debouncedQs);
	}, [debouncedQs, getValues, loadList, setValue]);

	return (
		<InfiniteListView
			loading={a01.listLoading}
			data={a01.listData}
			itemCount={a01.itemCount}
			loadMoreItems={a01.loadMoreItems}
			isItemLoaded={a01.isItemLoaded}
			RowComponent={A01ListRowContainer}
			height={height ? height - 142 : 300}
			handleItemsRendered={a01.handleItemsRendered}
			error={a01.listError}
		/>
	);
};

A01ListViewContainer.displayName = "A01ListViewContainer";