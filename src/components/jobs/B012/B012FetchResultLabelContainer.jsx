import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";
import { B032Context } from "@/contexts/B032/B032Context";

export const B012FetchResultLabelContainer = () => {
	const b = useContext(BContext);
	const b012 = useContext(b.forNew ? B032Context : B012Context);
	return (
		<FetchResultLabel
			totalElements={b012.itemCount}
			startIndex={b012.visibleStartIndex}
			endIndex={b012.visibleStopIndex}
		/>
	);
};

B012FetchResultLabelContainer.displayName = "B012FetchResultLabelContainer";


