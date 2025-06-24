import { useContext } from "react";
import { P21Context } from "@/modules/P21/P21Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const P21FetchResultLabelContainer = () => {
	const p21 = useContext(P21Context);
	return (
		<FetchResultLabel
			totalElements={p21.itemCount}
			startIndex={p21.visibleStartIndex}
			endIndex={p21.visibleStopIndex}
		/>
	);
};

P21FetchResultLabelContainer.displayName = "P21FetchResultLabelContainer";


