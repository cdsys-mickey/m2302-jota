import { useContext } from "react";
import A02Frame from "./A02Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";
import { useTheme } from "@mui/material";

export const A02FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return <A02Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />;
};

A02FrameContainer.displayName = "A02Frame";
