import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { D02Context } from "@/contexts/D02/D02Context";

export const D02FetchResultLabelContainer = () => {
	const c04 = useContext(D02Context);
	return (
		<FetchResultLabel
			totalElements={c04.itemCount}
			startIndex={c04.visibleStartIndex}
			endIndex={c04.visibleStopIndex}
		/>
	);
};

D02FetchResultLabelContainer.displayName = "D02FetchResultLabelContainer";


