import FrameMenuContainer from "@/components/layout/FrameMenuContainer";
import SideMenuSearchBarContainer from "@/components/layout/SideMenuSearchBarContainer";
import useAuth from "@/contexts/useAuth";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import useAppFrame from "@/shared-contexts/useAppFrame";
import BasePage from "./BasePage";

export const BasePageContainer = (props) => {
	const { ...rest } = props;

	const { drawerWidth, drawerOpen, handleDrawerClose, menuFloating } =
		useAppFrame();
	// const { height } = useWindowSize();
	const { validating } = useAuth();

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
