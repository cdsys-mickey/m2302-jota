import { useContext } from "react";
import A03Frame from "./A03Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";

export const A03FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	return <A03Frame drawerOpen={appFrame.drawerOpen} />;
};

A03FrameContainer.displayName = "A03Frame";
