import Styles from "@/modules/Styles.mjs";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import G10Frame from "./G10Frame";
import { G10Context } from "./G10Context";


export const G10FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);




	return (
		<G10Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
	);
};

G10FrameContainer.displayName = "G10Frame";




