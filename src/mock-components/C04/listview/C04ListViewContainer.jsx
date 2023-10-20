import React from "react";
import ItemListView from "@/shared-components/listview/ItemListView";
import useWindowSize from "@/shared-hooks/useWindowSize";
import { C04ListHeader } from "./C04ListItem";
import { C04ListItemContainer } from "./C04ListItemContainer";
import { usePurchase } from "@/contexts/purchase/usePurchase";
import { forwardRef } from "react";

const C04ListViewContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const { data } = usePurchase();

	return (
		<ItemListView
			height={height - 160}
			ItemComponent={C04ListItemContainer}
			header={<C04ListHeader />}
			data={data}
		/>
	);
});

C04ListViewContainer.displayName = "C04ListViewContainer";
export default C04ListViewContainer;
