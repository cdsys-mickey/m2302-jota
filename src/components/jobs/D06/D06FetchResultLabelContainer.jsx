import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { D06Context } from "@/contexts/D06/D06Context";

export const D06FetchResultLabelContainer = () => {
	const c04 = useContext(D06Context);
	return (
		<FetchResultLabel
			totalElements={c04.itemCount}
			startIndex={c04.visibleStartIndex}
			endIndex={c04.visibleStopIndex}
		/>
	);
};

D06FetchResultLabelContainer.displayName = "D06FetchResultLabelContainer";



