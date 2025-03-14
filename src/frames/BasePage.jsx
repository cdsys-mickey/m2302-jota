import FlexBox from "@/shared-components/FlexBox";
import AppFrameContainer from "@/shared-components/protected-page/AppFrameContainer";
import ResponsiveDrawer from "@/shared-components/responsive/ResponsiveDrawer";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import { SideMenuProvider } from "@/contexts/SideMenuProvider";
import { grey } from "@mui/material/colors";

const BasePage = (props) => {
	const {
		drawerOpen,
		onDrawerClose,
		onDrawerOpen,
		// height,
		drawerWidth = 260,
		// menuFloating,
		// loading,
		SearchBarComponent,
		MenuComponent,
	} = props;

	// const scrollable = useScrollable({
	// 	height,
	// });

	return (
		<FlexBox sx={{ overflow: "hidden" }}>
			<ResponsiveDrawer
				bgcolor={grey[100]}
				anchor="left"
				width={drawerWidth}
				open={drawerOpen}
				onClose={onDrawerClose}
				onOpen={onDrawerOpen}>
				<SideMenuProvider>
					{SearchBarComponent && <SearchBarComponent />}
					{MenuComponent && <MenuComponent />}
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
	onDrawerClose: PropTypes.func,
	onDrawerOpen: PropTypes.func,
	height: PropTypes.number,
	drawerWidth: PropTypes.number,
	SearchBarComponent: PropTypes.elementType,
	MenuComponent: PropTypes.elementType,
};

export default BasePage;
