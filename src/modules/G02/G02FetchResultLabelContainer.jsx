import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { G02Context } from "@/modules/G02/G02Context";

export const G02FetchResultLabelContainer = () => {
	const g02 = useContext(G02Context);
	return (
		<FetchResultLabel
			totalElements={g02.itemCount}
			startIndex={g02.visibleStartIndex}
			endIndex={g02.visibleStopIndex}
		/>
	);
};

G02FetchResultLabelContainer.displayName = "G02FetchResultLabelContainer";

