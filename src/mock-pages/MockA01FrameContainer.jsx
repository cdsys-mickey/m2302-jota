import MockA01Frame from "./MockA01Frame";
import useAppFrame from "@/shared-contexts/useAppFrame";
import useTheme from "@mui/material/styles/useTheme";

const MockA01FrameContainer = () => {
	const { drawerOpen } = useAppFrame();
	const theme = useTheme();
	return <MockA01Frame drawerOpen={drawerOpen} theme={theme} />;
};

MockA01FrameContainer.displayName = "MockA01FrameContainer";

export default MockA01FrameContainer;
