import { useContext } from "react";
import { G08Context } from "@/modules/G08/G08Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const G08FetchResultLabelContainer = () => {
	const g08 = useContext(G08Context);
	return (
		<FetchResultLabel
			totalElements={g08.itemCount}
			startIndex={g08.visibleStartIndex}
			endIndex={g08.visibleStopIndex}
		/>
	);
};

G08FetchResultLabelContainer.displayName = "G08FetchResultLabelContainer";


