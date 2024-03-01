import { useContext } from "react";
import { MessagingContext } from "../../contexts/MessagingContext";
import PushMessages from "./PushMessages";

export const PushMessagesContainer = () => {
	const messaging = useContext(MessagingContext);
	// const {recentMessagesLoading} = messaging;
	return (
		<PushMessages
			loading={messaging.recentMessagesLoading}
			data={messaging.recentMessages}
		/>
	);
};

PushMessagesContainer.displayName = "PushMessagesContainer";
