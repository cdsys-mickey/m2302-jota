import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { D01Context } from "@/contexts/D01/D01Context";

export const D01FetchResultLabelContainer = () => {
	const c04 = useContext(D01Context);
	return (
		<FetchResultLabel
			totalElements={c04.itemCount}
			startIndex={c04.visibleStartIndex}
			endIndex={c04.visibleStopIndex}
		/>
	);
};

D01FetchResultLabelContainer.displayName = "D01FetchResultLabelContainer";

