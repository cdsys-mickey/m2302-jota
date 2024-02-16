import { useContext } from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03FetchResultLabelContainer = () => {
	const users = useContext(ZA03Context);
	return (
		<FetchResultLabel
			totalElements={users.itemCount}
			startIndex={users.visibleStartIndex}
			endIndex={users.visibleStopIndex}
		/>
	);
};

ZA03FetchResultLabelContainer.displayName = "ZA03FetchResultLabelContainer";
