import { useContext } from "react";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import PushMessages from "./PushMessages";

export const PushMessagesContainer = () => {
	const messaging = useContext(MessagingContext);

	return (
		<PushMessages
			loading={messaging.recentMessagesLoading}
			data={messaging.recentMessages}
		/>
	);
};

PushMessagesContainer.displayName = "PushMessagesContainer";
