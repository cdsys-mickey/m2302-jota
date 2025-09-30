import { useContext } from "react";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import UnreadMessages from "./ZZUnreadMessages";

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
