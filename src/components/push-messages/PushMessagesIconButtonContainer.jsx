import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { MessagingContext } from "../../contexts/messaging/MessagingContext";
import PushMessagesIconButton from "./PushMessagesIconButton";

export const PushMessagesIconButtonContainer = () => {
	const messaging = useContext(MessagingContext);

	// useInit(() => {
	// 	loadUnreadCount();
	// }, []);

	return (
		<PushMessagesIconButton
			unreadCount={messaging?.unreadCount}
			togglePopoverOpen={messaging?.togglePopoverOpen}
		/>
	);
};
