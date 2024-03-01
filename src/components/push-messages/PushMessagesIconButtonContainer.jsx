import { useContext } from "react";
import { MessagingContext } from "../../contexts/MessagingContext";
import PushMessagesIconButton from "./PushMessagesIconButton";
import { useInit } from "../../shared-hooks/useInit";
import { useEffect } from "react";
import { LocalLaundryService } from "@mui/icons-material";
import { AuthContext } from "../../contexts/auth/AuthContext";

export const PushMessagesIconButtonContainer = (props) => {
	const { ...rest } = props;
	const { token } = useContext(AuthContext);
	const messaging = useContext(MessagingContext);
	const { loadUnreadCount } = messaging;

	// useInit(() => {
	// 	loadUnreadCount();
	// }, []);

	return (
		<PushMessagesIconButton
			unreadCount={messaging.unreadCount}
			togglePopoverOpen={messaging.togglePopoverOpen}
		/>
	);
};
