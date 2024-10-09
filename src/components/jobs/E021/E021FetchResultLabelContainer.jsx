import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { E021Context } from "@/contexts/E021/E021Context";

export const E021FetchResultLabelContainer = () => {
	const e021 = useContext(E021Context);
	return (
		<FetchResultLabel
			totalElements={e021.itemCount}
			startIndex={e021.visibleStartIndex}
			endIndex={e021.visibleStopIndex}
		/>
	);
};

E021FetchResultLabelContainer.displayName = "E021FetchResultLabelContainer";



