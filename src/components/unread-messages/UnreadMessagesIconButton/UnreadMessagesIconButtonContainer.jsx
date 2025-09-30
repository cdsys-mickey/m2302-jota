import { UnreadMessagesContext } from "@/contexts/UnreadMessagesContext";
import { useContext } from "react";
import UnreadMessagesIconButtonView from "./UnreadMessagesIconButtonView";

export const UnreadMessagesIconButtonContainer = () => {
	// const messaging = useContext(MessagingContext);
	const unreadMessages = useContext(UnreadMessagesContext);

	return (
		<UnreadMessagesIconButtonView
			unreadCount={unreadMessages?.unreadCount}
			togglePopoverOpen={unreadMessages?.togglePopoverOpen}
		/>
	);
};
