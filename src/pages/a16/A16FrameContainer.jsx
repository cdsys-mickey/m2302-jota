import { useContext } from "react";
import A16Frame from "./A16Frame";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";

export const A16FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	return <A16Frame drawerOpen={appFrame.drawerOpen} />;
};

A16FrameContainer.displayName = "A16Frame";
