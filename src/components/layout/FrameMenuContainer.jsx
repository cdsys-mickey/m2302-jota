import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import RWFrameMenu from "./RWFrameMenu";
import VFrameMenu from "./VFrameMenu";
import { SideMenuContext } from "../../contexts/SideMenuContext";

const FrameMenuContainer = (props) => {
	const { ...rest } = props;

	const { authoritiesLoading, authoritiesError } = useContext(AuthContext);
	const { height } = useWindowSize();
	// const { filteredAuthorities } = useSideMenu();
	const sideMenu = useContext(SideMenuContext);
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
		<RWFrameMenu
			height={height}
			data={sideMenu.filteredAuthorities}
			loading={authoritiesLoading}
			error={authoritiesError}
			width={drawerWidth}
			itemCount={sideMenu.filteredAuthorities?.length || 0}
			{...rest}
		/>
		// <VFrameMenu
		// 	height={height}
		// 	data={filteredAuthorities}
		// 	loading={authoritiesLoading}
		// 	error={authoritiesError}
		// 	width={drawerWidth}
		// 	itemCount={filteredAuthorities?.length || 0}
		// 	{...rest}
		// />
	);
};

FrameMenuContainer.displayName = "FrameMenuContainer";

export default FrameMenuContainer;
