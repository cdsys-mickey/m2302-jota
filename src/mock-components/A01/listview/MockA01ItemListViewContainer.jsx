import ItemListView from "@/shared-components/item-listview/ItemListView";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { MockA01ListHeader } from "./MockA01ListItem";
import { MockA01ListItemContainer } from "./MockA01ListItemContainer";
import { useProds } from "@/contexts/prods/useProds";

export const MockA01ItemListViewContainer = () => {
	const { height } = useWindowSize();
	const { data } = useProds();

	return (
		<ItemListView
			height={height - 150}
			ItemComponent={MockA01ListItemContainer}
			header={<MockA01ListHeader />}
			data={data}
		/>
	);
};
