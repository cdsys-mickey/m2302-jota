import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C05Context } from "@/contexts/C05/C05Context";

export const C05FetchResultLabelContainer = () => {
	const c05 = useContext(C05Context);
	return (
		<FetchResultLabel
			totalElements={c05.itemCount}
			startIndex={c05.visibleStartIndex}
			endIndex={c05.visibleStopIndex}
		/>
	);
};

C05FetchResultLabelContainer.displayName = "C05FetchResultLabelContainer";
