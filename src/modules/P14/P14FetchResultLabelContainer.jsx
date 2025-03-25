import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { P14Context } from "@/modules/P14/P14Context";

export const P14FetchResultLabelContainer = () => {
	const p14 = useContext(P14Context);
	return (
		<FetchResultLabel
			totalElements={p14.itemCount}
			startIndex={p14.visibleStartIndex}
			endIndex={p14.visibleStopIndex}
		/>
	);
};

P14FetchResultLabelContainer.displayName = "P14FetchResultLabelContainer";


