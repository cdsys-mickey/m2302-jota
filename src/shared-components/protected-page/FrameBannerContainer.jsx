import React from "react";
import FrameBanner from "./FrameBanner";
import { usePushMessages } from "@/contexts/PushMessagesContext";

export const FrameBannerContainer = React.forwardRef((props, ref) => {
	const { ...rest } = props;
	// const pushMessages = usePushMessages();

	return (
		<FrameBanner
			ref={ref}
			// onGenerateToast={pushMessages.handleGenerateToast}
			// messages={pushMessages.data}
			{...rest}
		/>
	);
});
