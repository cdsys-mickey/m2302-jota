import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { E03Context } from "@/contexts/E03/E03Context";

export const E03FetchResultLabelContainer = () => {
	const e03 = useContext(E03Context);
	return (
		<FetchResultLabel
			totalElements={e03.itemCount}
			startIndex={e03.visibleStartIndex}
			endIndex={e03.visibleStopIndex}
		/>
	);
};

E03FetchResultLabelContainer.displayName = "E03FetchResultLabelContainer";




