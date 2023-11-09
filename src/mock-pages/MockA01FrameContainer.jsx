import MockA01Frame from "./MockA01Frame";
import useAppFrame from "@/shared-contexts/app-frame/useAppFrame";
import useTheme from "@mui/material/styles/useTheme";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";

const MockA01FrameContainer = () => {
	const { drawerOpen } = useContext(AppFrameContext);
	const theme = useTheme();
	return <MockA01Frame drawerOpen={drawerOpen} theme={theme} />;
};

MockA01FrameContainer.displayName = "MockA01FrameContainer";

export default MockA01FrameContainer;
