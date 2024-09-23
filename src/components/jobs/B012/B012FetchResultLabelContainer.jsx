import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B012Context } from "@/contexts/B012/B012Context";

export const B012FetchResultLabelContainer = () => {
	const b012 = useContext(B012Context);
	return (
		<FetchResultLabel
			totalElements={b012.itemCount}
			startIndex={b012.visibleStartIndex}
			endIndex={b012.visibleStopIndex}
		/>
	);
};

B012FetchResultLabelContainer.displayName = "B012FetchResultLabelContainer";


