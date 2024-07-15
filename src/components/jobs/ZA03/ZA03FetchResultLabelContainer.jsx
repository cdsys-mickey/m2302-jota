import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03FetchResultLabelContainer = () => {
	const za03 = useContext(ZA03Context);
	return (
		<FetchResultLabel
			totalElements={za03.itemCount}
			startIndex={za03.visibleStartIndex}
			endIndex={za03.visibleStopIndex}
		/>
	);
};

ZA03FetchResultLabelContainer.displayName = "ZA03FetchResultLabelContainer";
