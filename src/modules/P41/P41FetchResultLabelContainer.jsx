import { useContext } from "react";
import { P41Context } from "@/modules/P41/P41Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const P41FetchResultLabelContainer = () => {
	const p41 = useContext(P41Context);
	return (
		<FetchResultLabel
			totalElements={p41.itemCount}
			startIndex={p41.visibleStartIndex}
			endIndex={p41.visibleStopIndex}
		/>
	);
};

P41FetchResultLabelContainer.displayName = "P41FetchResultLabelContainer";



