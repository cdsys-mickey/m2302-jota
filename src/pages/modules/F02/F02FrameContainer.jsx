import Styles from "@/modules/md-styles";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import F02Frame from "./F02Frame";

export const F02FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<F02Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
	);
};

F02FrameContainer.displayName = "F02Frame";


