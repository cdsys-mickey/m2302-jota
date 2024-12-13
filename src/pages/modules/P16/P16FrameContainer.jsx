import Styles from "@/modules/md-styles";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import P16Frame from "./P16Frame";

export const P16FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<P16Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
	);
};

P16FrameContainer.displayName = "P16Frame";

