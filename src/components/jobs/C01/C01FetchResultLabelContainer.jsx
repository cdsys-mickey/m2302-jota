import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C01Context } from "@/contexts/C01/C01Context";

export const C01FetchResultLabelContainer = () => {
	const c01 = useContext(C01Context);
	return (
		<FetchResultLabel
			totalElements={c01.itemCount}
			startIndex={c01.visibleStartIndex}
			endIndex={c01.visibleStopIndex}
		/>
	);
};

C01FetchResultLabelContainer.displayName = "C01FetchResultLabelContainer";
