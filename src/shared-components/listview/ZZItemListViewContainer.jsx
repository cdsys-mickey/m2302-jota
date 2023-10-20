import { useScrollTop } from "@/shared-hooks/useScrollTop";
import ItemListView from "./ItemListView";

export const ZZItemListViewContainer = ({ header, ...rest }) => {
	const { scrollTop, onScroll } = useScrollTop({
		debounce: 20,
	});
	return (
		<ItemListView
			header={header}
			scrollTop={scrollTop}
			onScroll={onScroll}
			{...rest}
		/>
	);
};
