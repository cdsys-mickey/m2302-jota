import { AuthContext } from "@/contexts/auth/AuthContext";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { SideMenuContext } from "@/contexts/SideMenuContext";
import { useReactWindowScroll } from "@/shared-hooks/react-window/useReactWindowScroll";
import RWFrameMenuView from "./RWFrameMenuView";
import FrameMenuContext from "../FrameMenu/FrameMenuContext";

const RWFrameMenuContainer = (props) => {
	const { dense = false, ...rest } = props;

	const { authoritiesLoading, authoritiesError, hiddenAuthoritiesCount } = useContext(AuthContext);
	const { height } = useWindowSize();
	// const { filteredAuthorities } = useSideMenu();
	const sideMenu = useContext(SideMenuContext);
	const { drawerWidth } = useContext(AppFrameContext);

	const { scrollOffset, onScroll } = useReactWindowScroll({ debounce: 0 });

	const contextValue = useMemo(() => {
		return {
			dense
		}
	}, [dense])

	const _data = useMemo(() => {
		return [
			...(sideMenu.filteredAuthorities ?? []),
			...(hiddenAuthoritiesCount > 0 ? [{
				severity: "warning",
				label: `找不到作業? 請前往個人設定調整 (${hiddenAuthoritiesCount})`
			}] : [])
		]
	}, [hiddenAuthoritiesCount, sideMenu.filteredAuthorities])

	const _itemCount = useMemo(() => {
		return (sideMenu.filteredAuthorities?.length || 0)
			+ (hiddenAuthoritiesCount > 0 ? 1 : 0);
	}, [hiddenAuthoritiesCount, sideMenu.filteredAuthorities?.length])

	return (
		<FrameMenuContext.Provider value={contextValue}>
			<RWFrameMenuView
				dense={dense}
				onScroll={onScroll}
				scrollOffset={scrollOffset}
				height={height - 56}
				// data={sideMenu.filteredAuthorities}
				data={_data}
				loading={authoritiesLoading}
				error={authoritiesError}
				width={drawerWidth}
				itemCount={_itemCount}
				onItemsRendered={sideMenu.handleItemsRendered}
				bottomReached={sideMenu.bottomReached}
				// bottomReached={true}
				{...rest}
			/>
		</FrameMenuContext.Provider>
	);
};

RWFrameMenuContainer.displayName = "RWFrameMenuContainer";

export default RWFrameMenuContainer;
