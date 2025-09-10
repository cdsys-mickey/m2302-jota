import { useCallback, useContext } from "react";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import useAppRedirect from "@/hooks/useAppRedirect";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import PushMessagesPopover from "./PushMessagesPopover";

export const PushMessagesPopoverContainer = () => {
	// const auth = useContext(AuthContext);
	const messaging = useContext(MessagingContext);
	const appFrame = useContext(AppFrameContext);
	const { handleSelect } = appFrame;
	// const { width } = useWindowSize();
	const { toMessages } = useAppRedirect();
	const { handlePopoverClose } = messaging;

	const gotoMessages = useCallback(() => {
		handlePopoverClose();
		handleSelect();
		toMessages();
	}, [handlePopoverClose, handleSelect, toMessages]);

	return (
		// <PushMessagesProvider>
		<PushMessagesPopover
			open={messaging.popoverOpen}
			anchorEl={messaging.popoverAnchorEl}
			onClose={messaging.handlePopoverClose}
			// loading={loading}
			// width={width - 90}
			gotoMessages={gotoMessages}
		/>
		// </PushMessagesProvider>
	);
};

PushMessagesPopoverContainer.displayName = "PushMessagesPopoverContainer";
