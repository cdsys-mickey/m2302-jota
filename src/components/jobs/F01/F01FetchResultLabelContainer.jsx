import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { F01Context } from "@/contexts/F01/F01Context";

export const F01FetchResultLabelContainer = () => {
	const f01 = useContext(F01Context);
	return (
		<FetchResultLabel
			totalElements={f01.itemCount}
			startIndex={f01.visibleStartIndex}
			endIndex={f01.visibleStopIndex}
		/>
	);
};

F01FetchResultLabelContainer.displayName = "F01FetchResultLabelContainer";

