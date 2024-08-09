import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import FrameBanner from "./FrameBanner";
import { MessagingProvider } from "@/contexts/MessagingProvider";
import { PushMessagesProvider } from "@/contexts/PushMessagesProvider";

export const FrameBannerContainer = (props) => {
	const { ...rest } = props;
	const appFrame = useContext(AppFrameContext);

	return (
		<PushMessagesProvider>
			<MessagingProvider>
				<FrameBanner
					title={appFrame.menuItemSelected?.JobName || "(作業名稱)"}
					alt={appFrame.menuItemSelected?.JobID || ""}
					{...rest}
				/>
			</MessagingProvider>
		</PushMessagesProvider>
	);
};
