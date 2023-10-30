import ItemListView from "@/shared-components/listview/ItemListView";
import useWindowSize from "@/shared-hooks/useWindowSize";
import { A01ListHeader } from "./A01ListItem";
import { A01ListItemContainer } from "./A01ListItemContainer";
import { useProds } from "@/contexts/prods/useProds";

export const A01ItemListViewContainer = () => {
	const { height } = useWindowSize();
	const { data } = useProds();

	return (
		<ItemListView
			height={height - 180}
			ItemComponent={A01ListItemContainer}
			header={<A01ListHeader />}
			data={data}
		/>
	);
};
