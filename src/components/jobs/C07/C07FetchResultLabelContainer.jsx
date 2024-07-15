import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C07Context } from "@/contexts/C07/C07Context";

export const C07FetchResultLabelContainer = () => {
	const c07 = useContext(C07Context);
	return (
		<FetchResultLabel
			totalElements={c07.itemCount}
			startIndex={c07.visibleStartIndex}
			endIndex={c07.visibleStopIndex}
		/>
	);
};

C07FetchResultLabelContainer.displayName = "C07FetchResultLabelContainer";
