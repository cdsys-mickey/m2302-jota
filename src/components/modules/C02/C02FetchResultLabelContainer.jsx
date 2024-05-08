import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C02Context } from "@/contexts/C02/C02Context";

export const C02FetchResultLabelContainer = () => {
	const c02 = useContext(C02Context);
	return (
		<FetchResultLabel
			totalElements={c02.itemCount}
			startIndex={c02.visibleStartIndex}
			endIndex={c02.visibleStopIndex}
		/>
	);
};

C02FetchResultLabelContainer.displayName = "C02FetchResultLabelContainer";
