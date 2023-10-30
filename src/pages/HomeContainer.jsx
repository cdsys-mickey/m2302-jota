import Home from "./Home";
import useAppFrame from "@/shared-contexts/useAppFrame";
import useTheme from "@mui/material/styles/useTheme";

const HomeContainer = () => {
	const { drawerOpen } = useAppFrame();
	const theme = useTheme();
	return <Home drawerOpen={drawerOpen} theme={theme} />;
};

HomeContainer.displayName = "HomeContainer";

export default HomeContainer;
