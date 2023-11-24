import { useContext } from "react";
import A03Frame from "./A03Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";

export const A03FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return <A03Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />;
};

A03FrameContainer.displayName = "A03Frame";
