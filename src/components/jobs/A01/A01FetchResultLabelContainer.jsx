import { A01Context } from "@/contexts/A01/A01Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { useContext } from "react";

export const A01FetchResultLabelContainer = () => {
	const a01 = useContext(A01Context);


	return (
		<FetchResultLabel
			totalElements={a01.itemCount}
			startIndex={a01.visibleStartIndex}
			endIndex={a01.visibleStopIndex}
		/>
	);
};

A01FetchResultLabelContainer.displayName = "A01FetchResultLabelContainer";
