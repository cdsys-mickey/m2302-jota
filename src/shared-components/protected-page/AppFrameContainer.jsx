import useAppFrame from "@/shared-contexts/app-frame/useAppFrame";
import AppFrame from "./AppFrame";

const AppFrameContainer = (props) => {
	const { ...rest } = props;
	const { drawerWidth, menuFloating } = useAppFrame();

	return (
		<AppFrame
			menuFloating={menuFloating}
			drawerWidth={drawerWidth}
			{...rest}
		/>
	);
};

AppFrameContainer.displayName = "AppFrameContainer";

export default AppFrameContainer;
