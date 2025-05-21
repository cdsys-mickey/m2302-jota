import { useContext } from "react";
import { G06Context } from "@/modules/G06/G06Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const G06FetchResultLabelContainer = () => {
	const g06 = useContext(G06Context);
	return (
		<FetchResultLabel
			totalElements={g06.itemCount}
			startIndex={g06.visibleStartIndex}
			endIndex={g06.visibleStopIndex}
		/>
	);
};

G06FetchResultLabelContainer.displayName = "G06FetchResultLabelContainer";

