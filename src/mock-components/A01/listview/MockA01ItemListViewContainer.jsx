import ItemListView from "@/shared-components/item-listview/ItemListView";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useMockProds } from "../../../contexts/prods/useMockProds";
import { MockA01ListHeader } from "./MockA01ListItem";
import { MockA01ListItemContainer } from "./MockA01ListItemContainer";

export const MockA01ItemListViewContainer = () => {
	const { height } = useWindowSize();
	const { data } = useMockProds();

	return (
		<ItemListView
			height={height - 150}
			ItemComponent={MockA01ListItemContainer}
			header={<MockA01ListHeader />}
			data={data}
		/>
	);
};
