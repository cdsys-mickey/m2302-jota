import { useContext } from "react";
import { A05Context } from "@/modules/A05/A05Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const A05FetchResultLabelContainer = () => {
	const a05 = useContext(A05Context);
	return (
		<FetchResultLabel
			totalElements={a05.itemCount}
			startIndex={a05.visibleStartIndex}
			endIndex={a05.visibleStopIndex}
		/>
	);
};

A05FetchResultLabelContainer.displayName = "A05FetchResultLabelContainer";
