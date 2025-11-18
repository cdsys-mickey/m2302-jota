import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import useContainerSize from "@/shared-hooks/useContainerSize";
import { useContext, useMemo } from "react";
import FrameBannerView from "./FrameBannerView";

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

	return (

		<div ref={containerRef}>
			<FrameBannerView
				title={title}
				alt={altTitle}
				dense={isSmOrDown}
				{...rest}
			/>
		</div>
	);
};
