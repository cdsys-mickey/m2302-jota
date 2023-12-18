import { useContext } from "react";
import ResponsiveFrameMenuButton from "./ResponsiveFrameMenuButton";
import { AppFrameContext } from "../../shared-contexts/app-frame/AppFrameContext";

const ResponsiveFrameMenuButtonContainer = (props) => {
	const { ...rest } = props;
	const { handleToggleDrawerOpen, isFrameMenuButtonVisibled } =
		useContext(AppFrameContext);

	return (
		<ResponsiveFrameMenuButton
			onClick={handleToggleDrawerOpen}
			visible={isFrameMenuButtonVisibled}
			{...rest}
		/>
	);
};

ResponsiveFrameMenuButtonContainer.displayName =
	"ResponsiveMenuButtonContainer";

export default ResponsiveFrameMenuButtonContainer;
