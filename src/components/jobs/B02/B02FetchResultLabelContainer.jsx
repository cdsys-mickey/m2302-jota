import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B02Context } from "@/contexts/B02/B02Context";

export const B02FetchResultLabelContainer = () => {
	const b02 = useContext(B02Context);
	return (
		<FetchResultLabel
			totalElements={b02.itemCount}
			startIndex={b02.visibleStartIndex}
			endIndex={b02.visibleStopIndex}
		/>
	);
};

B02FetchResultLabelContainer.displayName = "B02FetchResultLabelContainer";


