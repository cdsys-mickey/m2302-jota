import { useContext } from "react";
import { MessagingContext } from "../../contexts/messaging/MessagingContext";
import PushMessagesIconButton from "./PushMessagesIconButton";

export const PushMessagesIconButtonContainer = () => {
	const messaging = useContext(MessagingContext);

	return (
		<PushMessagesIconButton
			unreadCount={messaging?.unreadCount}
			togglePopoverOpen={messaging?.togglePopoverOpen}
		/>
	);
};
