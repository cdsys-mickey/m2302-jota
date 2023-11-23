import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import AppFrame from "./AppFrame";

const AppFrameContainer = (props) => {
	const { ...rest } = props;
	const { drawerWidth, menuFloating } = useContext(AppFrameContext);

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
