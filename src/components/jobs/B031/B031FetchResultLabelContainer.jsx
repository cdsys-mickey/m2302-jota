import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B031Context } from "@/contexts/B031/B031Context";

export const B031FetchResultLabelContainer = () => {
	const b031 = useContext(B031Context);
	return (
		<FetchResultLabel
			totalElements={b031.itemCount}
			startIndex={b031.visibleStartIndex}
			endIndex={b031.visibleStopIndex}
		/>
	);
};

B031FetchResultLabelContainer.displayName = "B031FetchResultLabelContainer";


