import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C08Context } from "@/contexts/C08/C08Context";

export const C08FetchResultLabelContainer = () => {
	const c08 = useContext(C08Context);
	return (
		<FetchResultLabel
			totalElements={c08.itemCount}
			startIndex={c08.visibleStartIndex}
			endIndex={c08.visibleStopIndex}
		/>
	);
};

C08FetchResultLabelContainer.displayName = "C08FetchResultLabelContainer";
