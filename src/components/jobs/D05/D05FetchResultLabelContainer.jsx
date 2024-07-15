import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { D05Context } from "@/contexts/D05/D05Context";

export const D05FetchResultLabelContainer = () => {
	const d05 = useContext(D05Context);
	return (
		<FetchResultLabel
			totalElements={d05.itemCount}
			startIndex={d05.visibleStartIndex}
			endIndex={d05.visibleStopIndex}
		/>
	);
};

D05FetchResultLabelContainer.displayName = "D05FetchResultLabelContainer";

