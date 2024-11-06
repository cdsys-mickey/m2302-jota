import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B032Context } from "@/contexts/B032/B032Context";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";

export const B032FetchResultLabelContainer = () => {
	const b = useContext(BContext);
	const b032 = useContext(b.forNew ? B032Context : B012Context);
	return (
		<FetchResultLabel
			totalElements={b032.itemCount}
			startIndex={b032.visibleStartIndex}
			endIndex={b032.visibleStopIndex}
		/>
	);
};

B032FetchResultLabelContainer.displayName = "B032FetchResultLabelContainer";



