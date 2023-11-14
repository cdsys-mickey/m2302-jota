import { useContext } from "react";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";
import FrameBanner from "./FrameBanner";
import { useResolvedPath } from "react-router-dom";
import { useMatch } from "react-router-dom";

export const FrameBannerContainer = (props) => {
	const { ...rest } = props;
	const appFrame = useContext(AppFrameContext);

	return (
		<FrameBanner
			title={appFrame.menuItemSelected?.JobName || "(未知)"}
			{...rest}
		/>
	);
};
