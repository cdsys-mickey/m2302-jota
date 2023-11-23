import MockA01Frame from "./MockA01Frame";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import Styles from "@/modules/md-styles";
import { useTheme } from "@mui/material";
import { useMemo } from "react";

const MockA01FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);
	return (
		<MockA01Frame drawerOpen={appFrame.drawerOpen} boxStyles={boxStyles} />
	);
};

MockA01FrameContainer.displayName = "MockA01FrameContainer";

export default MockA01FrameContainer;
