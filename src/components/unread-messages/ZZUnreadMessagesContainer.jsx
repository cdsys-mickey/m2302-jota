import { useContext } from "react";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import UnreadMessages from "./UnreadMessages";

export const UnreadMessagesContainer = () => {
	const messaging = useContext(MessagingContext);

	return (
		<UnreadMessages
			loading={messaging.recentMessagesLoading}
			data={messaging.recentMessages}
		/>
	);
};

UnreadMessagesContainer.displayName = "UnreadMessagesContainer";
