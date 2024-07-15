import { useContext } from "react";
import { A20Context } from "@/contexts/A20/A20Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const A20FetchResultLabelContainer = () => {
	const a20 = useContext(A20Context);
	return (
		<FetchResultLabel
			totalElements={a20.itemCount}
			startIndex={a20.visibleStartIndex}
			endIndex={a20.visibleStopIndex}
		/>
	);
};

A20FetchResultLabelContainer.displayName = "A20FetchResultLabelContainer";
