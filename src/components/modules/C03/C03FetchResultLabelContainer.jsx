import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C03Context } from "@/contexts/C03/C03Context";

export const C03FetchResultLabelContainer = () => {
	const c03 = useContext(C03Context);
	return (
		<FetchResultLabel
			totalElements={c03.itemCount}
			startIndex={c03.visibleStartIndex}
			endIndex={c03.visibleStopIndex}
		/>
	);
};

C03FetchResultLabelContainer.displayName = "C03FetchResultLabelContainer";
