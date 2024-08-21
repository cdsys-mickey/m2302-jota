import Styles from "@/modules/md-styles";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import A011Frame from "./A011Frame";

export const A011FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<div >
			<A011Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
		</div>
	);
};

A011FrameContainer.displayName = "A011Frame";
