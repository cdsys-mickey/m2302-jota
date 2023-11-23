import { useContext } from "react";
import MockC04Frame from "./MockC04Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";
import { useTheme } from "@mui/material";

export const MockC04FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<MockC04Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
	);
};

MockC04FrameContainer.displayName = "MockC04FrameContainer";
