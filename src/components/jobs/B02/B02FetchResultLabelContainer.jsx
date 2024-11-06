import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B02Context } from "@/contexts/B02/B02Context";
import { BContext } from "@/contexts/B/BContext";
import { B04Context } from "@/contexts/B04/B04Context";

export const B02FetchResultLabelContainer = () => {
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
	return (
		<FetchResultLabel
			totalElements={b02.itemCount}
			startIndex={b02.visibleStartIndex}
			endIndex={b02.visibleStopIndex}
		/>
	);
};

B02FetchResultLabelContainer.displayName = "B02FetchResultLabelContainer";


