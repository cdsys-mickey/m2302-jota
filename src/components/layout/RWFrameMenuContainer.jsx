import { AuthContext } from "@/contexts/auth/AuthContext";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { SideMenuContext } from "@/contexts/SideMenuContext";
import { useReactWindowScroll } from "@/shared-hooks/react-window/useReactWindowScroll";
import RWFrameMenu from "./RWFrameMenu";

const RWFrameMenuContainer = (props) => {
	const { ...rest } = props;

	const { authoritiesLoading, authoritiesError } = useContext(AuthContext);
	const { height } = useWindowSize();
	// const { filteredAuthorities } = useSideMenu();
	const sideMenu = useContext(SideMenuContext);
	const { drawerWidth } = useContext(AppFrameContext);

	const { scrollOffset, onScroll } = useReactWindowScroll({ debounce: 0 });

	return (
		<RWFrameMenu
			onScroll={onScroll}
			scrollOffset={scrollOffset}
			height={height - 56}
			data={sideMenu.filteredAuthorities}
			loading={authoritiesLoading}
			error={authoritiesError}
			width={drawerWidth}
			itemCount={sideMenu.filteredAuthorities?.length || 0}
			onItemsRendered={sideMenu.handleItemsRendered}
			bottomReached={sideMenu.bottomReached}
			// bottomReached={true}
			{...rest}
		/>
	);
};

RWFrameMenuContainer.displayName = "RWFrameMenuContainer";

export default RWFrameMenuContainer;
