import { MessagingProvider } from "@/contexts/messaging/MessagingProvider";
import { PushMessagesProvider } from "@/contexts/PushMessagesProvider";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import useContainerSize from "@/shared-hooks/useContainerSize";
import { useContext, useMemo } from "react";
import FrameBanner from "./FrameBanner";

export const FrameBannerContainer = (props) => {
	const { ...rest } = props;
	const appFrame = useContext(AppFrameContext);

	const { containerRef, isXs, isLgOrUp } = useContainerSize();

	const fullTitle = useMemo(() => {
		return [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName].filter(Boolean).join(" ");
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName])

	const altTitle = useMemo(() => {
		return appFrame.menuItemSelected?.JobID || ""
	}, [appFrame.menuItemSelected?.JobID])

	const title = useMemo(() => {
		if (isXs) {
			return altTitle;
		}
		if (isLgOrUp) {
			return fullTitle;
		}
		return appFrame.menuItemSelected?.JobName;
	}, [altTitle, appFrame.menuItemSelected?.JobName, fullTitle, isLgOrUp, isXs])

	return (
		<PushMessagesProvider>
			<MessagingProvider>
				<div ref={containerRef}>
					<FrameBanner
						title={title}
						alt={altTitle}
						{...rest}
					/>
				</div>
			</MessagingProvider>
		</PushMessagesProvider>
	);
};
