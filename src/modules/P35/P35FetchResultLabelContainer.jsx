import { useContext } from "react";
import { P35Context } from "@/modules/P35/P35Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const P35FetchResultLabelContainer = () => {
	const p35 = useContext(P35Context);
	return (
		<FetchResultLabel
			totalElements={p35.itemCount}
			startIndex={p35.visibleStartIndex}
			endIndex={p35.visibleStopIndex}
		/>
	);
};

P35FetchResultLabelContainer.displayName = "P35FetchResultLabelContainer";


