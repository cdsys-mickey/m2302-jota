import React from "react";
import PushMessagesButton from "@/components/push-messages/PushMessageButton";
import { usePushMessages } from "@/contexts/PushMessagesContext";

export const PushMessagesButtonContainer = React.forwardRef((props, ref) => {
	const { ...rest } = props;
	const {
		data,
		popoverAnchorEl,
		togglePopoverOpen,
		handlePopoverClose,
		handleGenerateToast,
	} = usePushMessages();

	return (
		<PushMessagesButton
			open={!!popoverAnchorEl}
			anchorEl={popoverAnchorEl}
			onClose={handlePopoverClose}
			data={data}
			onGenerateToast={handleGenerateToast}
			togglePopoverOpen={togglePopoverOpen}
		/>
	);
});
