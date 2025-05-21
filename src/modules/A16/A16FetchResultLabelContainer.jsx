import { useContext } from "react";
import { A16Context } from "@/modules/A16/A16Context";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";

export const A16FetchResultLabelContainer = () => {
	const a16 = useContext(A16Context);
	return (
		<FetchResultLabel
			totalElements={a16.itemCount}
			startIndex={a16.visibleStartIndex}
			endIndex={a16.visibleStopIndex}
		/>
	);
};

A16FetchResultLabelContainer.displayName = "A16FetchResultLabelContainer";

