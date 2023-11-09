import FrameMenuContainer from "@/components/layout/FrameMenuContainer";
import SideMenuSearchBarContainer from "@/components/layout/SideMenuSearchBarContainer";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import { useContext } from "react";
import { AppFrameContext } from "../shared-contexts/app-frame/AppFrameContext";
import BasePage from "./BasePage";

export const BasePageContainer = (props) => {
	const { ...rest } = props;

	const { drawerWidth, drawerOpen, handleDrawerClose, menuFloating } =
		useContext(AppFrameContext);
	// const { height } = useWindowSize();
	const { validating } = useContext(AuthContext);

	if (validating !== false) {
		return <LoadingFrame title="登入中..." />;
	}

	return (
		<BasePage
			// height={height}
			handleDrawerClose={handleDrawerClose}
			drawerOpen={drawerOpen}
			drawerWidth={drawerWidth}
			// menuFloating={menuFloating}
			// loading={loading}
			searchBar={<SideMenuSearchBarContainer name="q" />}
			// menu={<FrameAccordionContainer />}
			menu={<FrameMenuContainer />}
			{...rest}
		/>
	);
};
