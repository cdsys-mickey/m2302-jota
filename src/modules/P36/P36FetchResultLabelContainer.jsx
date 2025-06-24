import { useContext } from "react";
import { P36Context } from "@/modules/P36/P36Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const P36FetchResultLabelContainer = () => {
	const p36 = useContext(P36Context);
	return (
		<FetchResultLabel
			totalElements={p36.itemCount}
			startIndex={p36.visibleStartIndex}
			endIndex={p36.visibleStopIndex}
		/>
	);
};

P36FetchResultLabelContainer.displayName = "P36FetchResultLabelContainer";



