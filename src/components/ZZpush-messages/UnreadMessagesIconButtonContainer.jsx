import { UnreadMessagesContext } from "@/contexts/UnreadMessagesContext";
import { useContext } from "react";
import UnreadMessagesIconButton from "./UnreadMessagesIconButton";

export const UnreadMessagesIconButtonContainer = () => {
	// const messaging = useContext(MessagingContext);
	const unreadMessages = useContext(UnreadMessagesContext);

	return (
		<UnreadMessagesIconButton
			unreadCount={unreadMessages?.unreadCount}
			togglePopoverOpen={unreadMessages?.togglePopoverOpen}
		/>
	);
};
