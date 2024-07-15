import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C04Context } from "@/contexts/C04/C04Context";

export const C04FetchResultLabelContainer = () => {
	const c04 = useContext(C04Context);
	return (
		<FetchResultLabel
			totalElements={c04.itemCount}
			startIndex={c04.visibleStartIndex}
			endIndex={c04.visibleStopIndex}
		/>
	);
};

C04FetchResultLabelContainer.displayName = "C04FetchResultLabelContainer";
