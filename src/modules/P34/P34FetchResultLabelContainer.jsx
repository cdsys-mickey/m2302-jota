import { useContext } from "react";
import { P34Context } from "@/modules/P34/P34Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const P34FetchResultLabelContainer = () => {
	const p34 = useContext(P34Context);
	return (
		<FetchResultLabel
			totalElements={p34.itemCount}
			startIndex={p34.visibleStartIndex}
			endIndex={p34.visibleStopIndex}
		/>
	);
};

P34FetchResultLabelContainer.displayName = "P34FetchResultLabelContainer";

