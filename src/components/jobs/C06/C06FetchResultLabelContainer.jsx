import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C06Context } from "@/contexts/C06/C06Context";

export const C06FetchResultLabelContainer = () => {
	const c06 = useContext(C06Context);
	return (
		<FetchResultLabel
			totalElements={c06.itemCount}
			startIndex={c06.visibleStartIndex}
			endIndex={c06.visibleStopIndex}
		/>
	);
};

C06FetchResultLabelContainer.displayName = "C06FetchResultLabelContainer";
