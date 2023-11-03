import useAppFrame from "@/shared-contexts/app-frame/useAppFrame";
import { FrameMenuButton } from "./FrameMenuButton";

const FrameMenuButtonContainer = (props) => {
	const { ...rest } = props;
	const { handleToggleDrawerOpen, drawerOpen } = useAppFrame();

	return (
		<FrameMenuButton
			onClick={handleToggleDrawerOpen}
			drawerOpen={drawerOpen}
			{...rest}
		/>
	);
};

FrameMenuButtonContainer.displayName = "FrameMenuButtonContainer";

export default FrameMenuButtonContainer;
