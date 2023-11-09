import Home from "./Home";
import useAppFrame from "@/shared-contexts/app-frame/useAppFrame";
import useTheme from "@mui/material/styles/useTheme";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";

const HomeContainer = () => {
	const { drawerOpen } = useContext(AppFrameContext);
	const theme = useTheme();
	return <Home drawerOpen={drawerOpen} theme={theme} />;
};

HomeContainer.displayName = "HomeContainer";

export default HomeContainer;
