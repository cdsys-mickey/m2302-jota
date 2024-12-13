import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { F03Context } from "@/contexts/F03/F03Context";

export const F03FetchResultLabelContainer = () => {
	const c04 = useContext(F03Context);
	return (
		<FetchResultLabel
			totalElements={c04.itemCount}
			startIndex={c04.visibleStartIndex}
			endIndex={c04.visibleStopIndex}
		/>
	);
};

F03FetchResultLabelContainer.displayName = "F03FetchResultLabelContainer";





