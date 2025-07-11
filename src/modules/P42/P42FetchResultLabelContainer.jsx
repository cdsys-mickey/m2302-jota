import { useContext } from "react";
import { P42Context } from "@/modules/P42/P42Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const P42FetchResultLabelContainer = () => {
	const p42 = useContext(P42Context);
	return (
		<FetchResultLabel
			totalElements={p42.itemCount}
			startIndex={p42.visibleStartIndex}
			endIndex={p42.visibleStopIndex}
		/>
	);
};

P42FetchResultLabelContainer.displayName = "P42FetchResultLabelContainer";




