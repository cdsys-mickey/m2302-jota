import { AuthContext } from "@/contexts/auth/AuthContext";
import useSideMenu from "@/contexts/useSideMenu";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";
import VirtualizedFrameMenu from "./VirtualizedFrameMenu";

const FrameMenuContainer = (props) => {
	const { ...rest } = props;
	// const { menus } = useContext(AppFrameContext);
	const { authoritiesLoading, authoritiesError } = useContext(AuthContext);
	const { height } = useWindowSize();
	const { filteredAuthorities } = useSideMenu();
	const { drawerWidth } = useContext(AppFrameContext);

	return (
		// <FrameMenu
		// 	height={height}
		// 	authorities={filteredAuthorities}
		// 	authoritiesLoading={authoritiesLoading}
		// 	authoritiesError={authoritiesError}
		// 	width={drawerWidth}
		// 	itemCount={filteredAuthorities?.length || 0}
		// 	{...rest}
		// />
		<VirtualizedFrameMenu
			height={height}
			authorities={filteredAuthorities}
			authoritiesLoading={authoritiesLoading}
			authoritiesError={authoritiesError}
			width={drawerWidth}
			itemCount={filteredAuthorities?.length || 0}
			{...rest}
		/>
	);
};

FrameMenuContainer.displayName = "FrameMenuContainer";

export default FrameMenuContainer;
