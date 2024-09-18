import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B011Context } from "@/contexts/B011/B011Context";

export const B011FetchResultLabelContainer = () => {
	const b011 = useContext(B011Context);
	return (
		<FetchResultLabel
			totalElements={b011.itemCount}
			startIndex={b011.visibleStartIndex}
			endIndex={b011.visibleStopIndex}
		/>
	);
};

B011FetchResultLabelContainer.displayName = "B011FetchResultLabelContainer";

