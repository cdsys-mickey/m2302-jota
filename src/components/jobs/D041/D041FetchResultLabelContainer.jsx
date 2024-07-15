import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { D041Context } from "@/contexts/D041/D041Context";

export const D041FetchResultLabelContainer = () => {
	const c04 = useContext(D041Context);
	return (
		<FetchResultLabel
			totalElements={c04.itemCount}
			startIndex={c04.visibleStartIndex}
			endIndex={c04.visibleStopIndex}
		/>
	);
};

D041FetchResultLabelContainer.displayName = "D041FetchResultLabelContainer";



