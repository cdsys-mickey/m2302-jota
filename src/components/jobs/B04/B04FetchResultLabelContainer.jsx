import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B04Context } from "@/contexts/B04/B04Context";

export const B04FetchResultLabelContainer = () => {
	const b04 = useContext(B04Context);
	return (
		<FetchResultLabel
			totalElements={b04.itemCount}
			startIndex={b04.visibleStartIndex}
			endIndex={b04.visibleStopIndex}
		/>
	);
};

B04FetchResultLabelContainer.displayName = "B04FetchResultLabelContainer";



