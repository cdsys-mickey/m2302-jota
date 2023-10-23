import SideMenuContainer from "@/components/layout/SideMenuContainer";
import { Outlet } from "react-router-dom";
import FlexBox from "@/shared-components/FlexBox";
import ResponsiveDrawer from "@/shared-components/responsive/ResponsiveDrawer";
import SideMenuSearchBarContainer from "@/shared-components/side-menu/SideMenuSearchBarContainer";
import PropTypes from "prop-types";
import AppFrameContainer from "@/shared-components/protected-page/AppFrameContainer";

const FrameBase = (props) => {
	const {
		drawerOpen,
		handleDrawerClose,
		height,
		drawerWidth = 260,
		// bannerOptions,
	} = props;

	return (
		<FlexBox sx={{}}>
			<ResponsiveDrawer
				anchor="left"
				width={260}
				open={drawerOpen}
				onClose={handleDrawerClose}>
				<SideMenuSearchBarContainer name="q" />
				<SideMenuContainer py={1} height={height - 56} />
			</ResponsiveDrawer>
			<AppFrameContainer drawerWidth={drawerWidth}>
				<Outlet />
			</AppFrameContainer>
		</FlexBox>
	);
};

FrameBase.propTypes = {
	drawerOpen: PropTypes.bool,
	handleDrawerClose: PropTypes.func,
	height: PropTypes.number,
	drawerWidth: PropTypes.number,
};

export default FrameBase;
