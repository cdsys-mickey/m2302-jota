import { useLocation } from "react-router-dom";
import FrameMenu from "./FrameMenu";

const FrameMenuContainer = (props) => {
	const { ...rest } = props;
	const location = useLocation();
	// const sessions = useSessionContext();

	return (
		<FrameMenu
			// from context
			// PROPS
			// items={sessions.menuItems}
			// drawerOpen={sessions.drawerOpen}
			pathname={location.pathname}
			{...rest}
		/>
	);
};

export default FrameMenuContainer;
