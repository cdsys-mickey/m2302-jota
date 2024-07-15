import { useContext } from "react";
import { A06Context } from "@/contexts/A06/A06Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const A06FetchResultLabelContainer = () => {
	const a06 = useContext(A06Context);
	return (
		<FetchResultLabel
			totalElements={a06.itemCount}
			startIndex={a06.visibleStartIndex}
			endIndex={a06.visibleStopIndex}
		/>
	);
};

A06FetchResultLabelContainer.displayName = "A06FetchResultLabelContainer";
