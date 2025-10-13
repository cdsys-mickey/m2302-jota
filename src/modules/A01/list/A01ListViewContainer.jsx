import AuthListView from "@/components/AuthListView/AuthListView";
import { A01Context } from "@/modules/A01/A01Context";
import useDebounce from "@/shared-hooks/useDebounce";
import { useInit } from "@/shared-hooks/useInit";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ListViewBox from "../../../shared-components/listview/ListViewBox";
import { useChangeTracking } from "../../../shared-hooks/useChangeTracking";
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
				saveKey={a01.saveKey}
				loading={a01.listLoading}
				data={a01.listData}
				itemCount={a01.itemCount}
				loadMoreItems={a01.loadMoreItems}
				isItemLoaded={a01.isItemLoaded}
				RowComponent={A01ListRowContainer}
				height={_height}
				handleItemsRendered={a01.handleItemsRendered}
				error={a01.listError}
				bottomReached={true}
			/>
		</ListViewBox>
	);
};

A01ListViewContainer.displayName = "A01ListViewContainer";
