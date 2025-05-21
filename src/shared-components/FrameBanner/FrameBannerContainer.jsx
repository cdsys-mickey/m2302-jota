import { MessagingProvider } from "@/contexts/messaging/MessagingProvider";
import { PushMessagesProvider } from "@/contexts/PushMessagesProvider";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import useContainerSize from "@/shared-hooks/useContainerSize";
import { useContext, useMemo } from "react";
import FrameBanner from "./FrameBannerView";
import FrameBannerView from "./FrameBannerView";

export const FrameBannerContainer = (props) => {
	const { ...rest } = props;
	const appFrame = useContext(AppFrameContext);

	const { containerRef, isMdOrDown, isLgOrUp } = useContainerSize();

	const fullTitle = useMemo(() => {
		return [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName].filter(Boolean).join(" ");
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName])

	const altTitle = useMemo(() => {
		return appFrame.menuItemSelected?.JobID || ""
	}, [appFrame.menuItemSelected?.JobID])

	const title = useMemo(() => {
		if (isMdOrDown) {
			return altTitle;
		}
		if (isLgOrUp) {
			return fullTitle;
		}
		return appFrame.menuItemSelected?.JobName;
	}, [altTitle, appFrame.menuItemSelected?.JobName, fullTitle, isLgOrUp, isMdOrDown])

	return (
		<PushMessagesProvider>
			<MessagingProvider>
				<div ref={containerRef}>
					<FrameBannerView
						title={title}
						alt={altTitle}
						dense={isMdOrDown}
						{...rest}
					/>
				</div>
			</MessagingProvider>
		</PushMessagesProvider>
	);
};
