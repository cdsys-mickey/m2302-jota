import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { B05Context } from "@/modules/B05/B05Context";

export const B05FetchResultLabelContainer = () => {
	const b05 = useContext(B05Context);
	return (
		<FetchResultLabel
			totalElements={b05.itemCount}
			startIndex={b05.visibleStartIndex}
			endIndex={b05.visibleStopIndex}
		/>
	);
};

B05FetchResultLabelContainer.displayName = "B05FetchResultLabelContainer";
