import { useLocation } from "react-router-dom";
import ZZFrameMenu from "./ZZFrameMenu";

const ZZFrameMenuContainer = (props) => {
	const { ...rest } = props;
	const location = useLocation();
	// const sessions = useSessionContext();

	return (
		<ZZFrameMenu
			// from context
			// PROPS
			// items={sessions.menuItems}
			// drawerOpen={sessions.drawerOpen}
			pathname={location.pathname}
			{...rest}
		/>
	);
};

export default ZZFrameMenuContainer;
