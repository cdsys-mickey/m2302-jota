import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { E01Context } from "@/contexts/E01/E01Context";

export const E01FetchResultLabelContainer = () => {
	const e01 = useContext(E01Context);
	return (
		<FetchResultLabel
			totalElements={e01.itemCount}
			startIndex={e01.visibleStartIndex}
			endIndex={e01.visibleStopIndex}
		/>
	);
};

E01FetchResultLabelContainer.displayName = "E01FetchResultLabelContainer";


