import { useContext } from "react";
import { B06Context } from "@/contexts/B06/B06Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const B06FetchResultLabelContainer = () => {
	const b06 = useContext(B06Context);
	return (
		<FetchResultLabel
			totalElements={b06.itemCount}
			startIndex={b06.visibleStartIndex}
			endIndex={b06.visibleStopIndex}
		/>
	);
};

B06FetchResultLabelContainer.displayName = "B06FetchResultLabelContainer";
