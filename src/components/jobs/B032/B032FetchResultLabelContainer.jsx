import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B032Context } from "@/contexts/B032/B032Context";

export const B032FetchResultLabelContainer = () => {
	const b032 = useContext(B032Context);
	return (
		<FetchResultLabel
			totalElements={b032.itemCount}
			startIndex={b032.visibleStartIndex}
			endIndex={b032.visibleStopIndex}
		/>
	);
};

B032FetchResultLabelContainer.displayName = "B032FetchResultLabelContainer";



