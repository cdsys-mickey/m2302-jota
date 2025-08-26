import SideMenuSearchBarContainer from "@/components/layout/SideMenuSearchBarContainer";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import { useContext } from "react";
import RWFrameMenuContainer from "@/components/layout/RWFrameMenuContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import BaseFrameView from "./BaseFrameView";

const BaseFrameContainer = (props) => {
	const { ...rest } = props;

	const { drawerWidth, drawerOpen, handleDrawerClose, handleDrawerOpen } =
		useContext(AppFrameContext);
	// const { height } = useWindowSize();
	const { validating } = useContext(AuthContext);

	if (validating !== false) {
		return <LoadingFrame title="登入中..." />;
	}

	return (
		<BaseFrameView
			// height={height}
			onDrawerClose={handleDrawerClose}
			onDrawerOpen={handleDrawerOpen}
			drawerOpen={drawerOpen}
			drawerWidth={drawerWidth}
			// menuFloating={menuFloating}
			// loading={loading}
			SearchBarComponent={SideMenuSearchBarContainer}
			// menu={<FrameAccordionContainer />}
			// menu={<FrameMenuContainer />}
			MenuComponent={RWFrameMenuContainer}
			{...rest}
		/>
	);
};

export default BaseFrameContainer;