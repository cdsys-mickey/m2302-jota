import { useContext } from "react";
import { MessagingContext } from "../../contexts/MessagingContext";
import PushMessagesPopover from "./PushMessagesPopover";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useMemo } from "react";
import { useWindowSize } from "../../shared-hooks/useWindowSize";
import useAppRedirect from "../../hooks/useAppRedirect";
import { useCallback } from "react";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";

export const PushMessagesPopoverContainer = () => {
	const messaging = useContext(MessagingContext);
	const appFrame = useContext(AppFrameContext);
	const { handleSelect } = appFrame;
	const { height, width } = useWindowSize();
	const { token } = useContext(AuthContext);
	const { toMessages } = useAppRedirect();
	const {
		recentMessagesLoading,
		loadRecentMessages,
		popoverOpen,
		handlePopoverClose,
	} = messaging;

	const loading = useMemo(() => {
		return messaging.recentMessagesLoading && !!messaging.recentMessages;
	}, [messaging.recentMessages, messaging.recentMessagesLoading]);

	const gotoMessages = useCallback(() => {
		handlePopoverClose();
		handleSelect();
		toMessages();
	}, [handlePopoverClose, handleSelect, toMessages]);

	// 展開的時候若未讀則讀取
	useEffect(() => {
		if (popoverOpen && recentMessagesLoading === null) {
			loadRecentMessages();
		}
	}, [loadRecentMessages, popoverOpen, recentMessagesLoading, token]);

	return (
		<PushMessagesPopover
			open={messaging.popoverOpen}
			anchorEl={messaging.popoverAnchorEl}
			onClose={messaging.handlePopoverClose}
			loading={loading}
			height={height - 180}
			width={width - 90}
			gotoMessages={gotoMessages}
		/>
	);
};

PushMessagesPopoverContainer.displayName = "PushMessagesPopoverContainer";
