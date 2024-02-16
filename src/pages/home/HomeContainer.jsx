import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import useTheme from "@mui/material/styles/useTheme";
import { useContext, useMemo } from "react";
import Styles from "../../modules/md-styles";
import Home from "./Home";

const HomeContainer = () => {
	const { drawerOpen } = useContext(AppFrameContext);
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofHomeBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);

	return <Home drawerOpen={drawerOpen} theme={theme} boxStyles={boxStyles} />;
};

HomeContainer.displayName = "HomeContainer";

export default HomeContainer;
