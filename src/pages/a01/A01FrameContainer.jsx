import { useContext } from "react";
import A01Frame from "./A01Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";
import { useTheme } from "@mui/material";

export const A01FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<A01Frame
			// drawerOpen={appFrame.drawerOpen}
			boxStyles={boxStyles}
		/>
	);
};

A01FrameContainer.displayName = "A01Frame";
