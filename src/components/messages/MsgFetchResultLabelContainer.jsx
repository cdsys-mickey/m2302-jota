import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { useContext } from "react";
import { MessagingContext } from "../../contexts/MessagingContext";
import { PushMessagesContext } from "@/contexts/PushMessagesContext";
import { MessagesContext } from "@/contexts/MessagesContext";

export const MsgFetchResultLabelContainer = () => {
	// const messaging = useContext(MessagingContext);
	const messages = useContext(MessagesContext);
	return (
		<FetchResultLabel
			totalElements={messages.itemCount}
			startIndex={messages.visibleStartIndex}
			endIndex={messages.visibleStopIndex}
		/>
	);
};

MsgFetchResultLabelContainer.displayName = "MsgFetchResultLabelContainer";
