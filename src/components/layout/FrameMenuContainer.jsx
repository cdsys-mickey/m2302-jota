import useAuth from "@/contexts/useAuth";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import FrameMenu from "./FrameMenu";
import useSideMenu from "@/contexts/useSideMenu";
import useAppFrame from "@/shared-contexts/app-frame/useAppFrame";
import VirtualizedFrameMenu from "./VirtualizedFrameMenu";

const FrameMenuContainer = (props) => {
	const { ...rest } = props;
	// const { menus } = useAppFrame();
	const { authoritiesLoading, authoritiesError } = useAuth();
	const { height } = useWindowSize();
	const { filteredAuthorities } = useSideMenu();
	const { drawerWidth } = useAppFrame();

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
