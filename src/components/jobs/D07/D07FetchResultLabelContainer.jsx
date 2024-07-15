import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { D07Context } from "@/contexts/D07/D07Context";

export const D07FetchResultLabelContainer = () => {
	const c04 = useContext(D07Context);
	return (
		<FetchResultLabel
			totalElements={c04.itemCount}
			startIndex={c04.visibleStartIndex}
			endIndex={c04.visibleStopIndex}
		/>
	);
};

D07FetchResultLabelContainer.displayName = "D07FetchResultLabelContainer";




