import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import useContainerSize from "@/shared-hooks/useContainerSize";
import { useContext, useMemo } from "react";
import FrameBannerView from "./FrameBannerView";
import useVersionCheck from "@/shared-hooks/useVersionCheck";

export const FrameBannerContainer = (props) => {
	const { ...rest } = props;
	const appFrame = useContext(AppFrameContext);

	const { containerRef, isMdOrUp, isSmOrDown } = useContainerSize();

	const fullTitle = useMemo(() => {
		return [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName].filter(Boolean).join(" ");
	}, [appFrame.menuItemSelected?.JobID, appFrame.menuItemSelected?.JobName])

	const altTitle = useMemo(() => {
		return appFrame.menuItemSelected?.JobID || ""
	}, [appFrame.menuItemSelected?.JobID])

	const title = useMemo(() => {
		if (isSmOrDown) {
			return altTitle;
		}
		if (isMdOrUp) {
			return fullTitle;
		}
		return appFrame.menuItemSelected?.JobName;
	}, [altTitle, appFrame.menuItemSelected?.JobName, fullTitle, isMdOrUp, isSmOrDown])

	const { newVersion } = useVersionCheck({ autoPrompt: false });

	return (

		<div ref={containerRef}>
			<FrameBannerView
				title={title}
				dense={isSmOrDown}
				// #for dev use
				// newVersion="9999.01.01"
				newVersion={newVersion}
				{...rest}
			/>
		</div>
	);
};
