import { useCallback, useContext } from "react";
import { MessagingContext } from "@/contexts/messaging/MessagingContext";
import useAppRedirect from "@/hooks/useAppRedirect";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import PushMessagesPopover from "./PushMessagesPopover";
import { useMemo } from "react";

export const PushMessagesPopoverContainer = () => {
	// const auth = useContext(AuthContext);
	const messaging = useContext(MessagingContext);
	const appFrame = useContext(AppFrameContext);
	const { handleSelect } = appFrame;
	// const { width } = useWindowSize();
	const { toMessages } = useAppRedirect();
	const { handlePopoverClose } = messaging;

	// const loading = useMemo(() => {
	// 	return messaging.recentMessagesLoading && !!messaging.recentMessages;
	// }, [messaging.recentMessages, messaging.recentMessagesLoading]);

	const gotoMessages = useCallback(() => {
		handlePopoverClose();
		handleSelect();
		toMessages();
	}, [handlePopoverClose, handleSelect, toMessages]);

	// 展開的時候若未讀則讀取
	// useInit(() => {
	// 	auth.loadList();
	// }, []);



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
