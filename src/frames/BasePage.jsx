import FlexBox from "@/shared-components/FlexBox";
import AppFrameContainer from "@/shared-components/protected-page/AppFrameContainer";
import ResponsiveDrawer from "@/shared-components/responsive/ResponsiveDrawer";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { SideMenuProvider } from "@/contexts/SideMenuProvider";

const BasePage = (props) => {
	const {
		drawerOpen,
		handleDrawerClose,
		// height,
		drawerWidth = 260,
		// menuFloating,
		// loading,
		searchBar,
		menu,
	} = props;

	// const scrollable = useScrollable({
	// 	height,
	// });

	return (
		<FlexBox sx={{}}>
			<ResponsiveDrawer
				anchor="left"
				width={drawerWidth}
				open={drawerOpen}
				onClose={handleDrawerClose}>
				<SideMenuProvider>
					{searchBar}
					{menu}
				</SideMenuProvider>
			</ResponsiveDrawer>

			<AppFrameContainer drawerWidth={drawerWidth}>
				<Outlet />
			</AppFrameContainer>
		</FlexBox>
	);
};

BasePage.propTypes = {
	drawerOpen: PropTypes.bool,
	handleDrawerClose: PropTypes.func,
	height: PropTypes.number,
	drawerWidth: PropTypes.number,
	searchBar: PropTypes.element,
	menu: PropTypes.element,
};

export default BasePage;
