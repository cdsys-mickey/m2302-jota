import { AllMessagesContext } from "@/contexts/msgs/AllMessagesContext";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { useContext } from "react";

export const AllMessagesFetchResultLabelContainer = () => {
	const allMessages = useContext(AllMessagesContext);
	return (
		<FetchResultLabel
			totalElements={allMessages.itemCount}
			startIndex={allMessages.visibleStartIndex}
			endIndex={allMessages.visibleStopIndex}
		/>
	);
};

AllMessagesFetchResultLabelContainer.displayName = "AllMessagesFetchResultLabelContainer";
