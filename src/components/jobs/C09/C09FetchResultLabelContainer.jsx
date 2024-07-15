import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C09Context } from "@/contexts/C09/C09Context";

export const C09FetchResultLabelContainer = () => {
	const c09 = useContext(C09Context);
	return (
		<FetchResultLabel
			totalElements={c09.itemCount}
			startIndex={c09.visibleStartIndex}
			endIndex={c09.visibleStopIndex}
		/>
	);
};

C09FetchResultLabelContainer.displayName = "C09FetchResultLabelContainer";
