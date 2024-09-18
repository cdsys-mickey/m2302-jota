import { MessagesContext } from "@/contexts/msgs/MessagesContext";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { useContext } from "react";

export const MsgFetchResultLabelContainer = () => {
	// const messaging = useContext(MessagingContext);
	const msgs = useContext(MessagesContext);
	return (
		<FetchResultLabel
			totalElements={msgs.itemCount}
			startIndex={msgs.visibleStartIndex}
			endIndex={msgs.visibleStopIndex}
		/>
	);
};

MsgFetchResultLabelContainer.displayName = "MsgFetchResultLabelContainer";
