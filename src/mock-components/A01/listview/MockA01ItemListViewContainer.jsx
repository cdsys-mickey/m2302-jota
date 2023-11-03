import ItemListView from "@/shared-components/listview/ItemListView";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { A01ListHeader } from "./MockA01ListItem";
import { MockA01ListItemContainer } from "./MockA01ListItemContainer";
import { useProds } from "@/contexts/prods/useProds";

export const MockA01ItemListViewContainer = () => {
	const { height } = useWindowSize();
	const { data } = useProds();

	return (
		<ItemListView
			height={height - 140}
			ItemComponent={MockA01ListItemContainer}
			header={<A01ListHeader />}
			data={data}
		/>
	);
};
