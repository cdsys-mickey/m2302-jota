import { useContext } from "react";
import A02Frame from "./A02Frame";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";

export const A02FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	return <A02Frame drawerOpen={appFrame.drawerOpen} />;
};

A02FrameContainer.displayName = "A02Frame";
