import { UnreadMessagesContext } from "@/contexts/UnreadMessagesContext";
import useAppRedirect from "@/hooks/useAppRedirect";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useCallback, useContext } from "react";
import UnreadMessagesPopoverView from "./UnreadMessagesPopoverView";

export const UnreadMessagesPopoverContainer = () => {
	// const messaging = useContext(MessagingContext);
	const unreadMessages = useContext(UnreadMessagesContext);
	const appFrame = useContext(AppFrameContext);
	const { handleSelect } = appFrame;
	const { toMessages } = useAppRedirect();
	const { handlePopoverClose } = unreadMessages;

	const gotoMessages = useCallback(() => {
		handlePopoverClose();
		handleSelect();
		toMessages();
	}, [handlePopoverClose, handleSelect, toMessages]);

	return (
		<UnreadMessagesPopoverView
			open={unreadMessages.popoverOpen}
			anchorEl={unreadMessages.popoverAnchorEl}
			onClose={unreadMessages.handlePopoverClose}
			// loading={loading}
			// width={width - 90}
			gotoMessages={gotoMessages}
		/>
	);
};

UnreadMessagesPopoverContainer.displayName = "PushMessagesPopoverContainer";
