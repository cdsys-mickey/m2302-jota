import ResponsiveFrameMenuButton from "./ResponsiveFrameMenuButton";
import useAppFrame from "@/shared-contexts/app-frame/useAppFrame";

const ResponsiveFrameMenuButtonContainer = (props) => {
	const { ...rest } = props;
	const { handleToggleDrawerOpen, isFrameMenuButtonVisibled } = useAppFrame();

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
