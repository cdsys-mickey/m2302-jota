import ItemListView from "@/shared-components/listview/item-listview/ItemListView";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
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
			ref={ref}
			height={height - 150}
			ItemComponent={C04ListItemContainer}
			header={<C04ListHeader />}
			data={data}
			{...rest}
		/>
	);
});

C04ListViewContainer.displayName = "C04ListViewContainer";
export default C04ListViewContainer;
