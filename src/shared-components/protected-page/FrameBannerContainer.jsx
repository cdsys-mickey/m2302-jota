import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import FrameBanner from "./FrameBanner";
import { MessagingProvider } from "@/contexts/messaging/MessagingProvider";
import { PushMessagesProvider } from "@/contexts/PushMessagesProvider";
import { useMemo } from "react";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";

export const FrameBannerContainer = (props) => {
	const { ...rest } = props;
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

	const fullTitle = useMemo(() => {
		return appFrame.menuItemSelected?.JobName || "(作業名稱)";
	}, [appFrame.menuItemSelected?.JobName])

	const altTitle = useMemo(() => {
		return appFrame.menuItemSelected?.JobID || ""
	}, [appFrame.menuItemSelected?.JobID])

	const title = useMemo(() => {
		return isLgUp ? fullTitle : altTitle;
	}, [altTitle, fullTitle, isLgUp])

	return (
		<PushMessagesProvider>
			<MessagingProvider>
				<FrameBanner
					title={title}
					alt={altTitle}
					{...rest}
				/>
			</MessagingProvider>
		</PushMessagesProvider>
	);
};
