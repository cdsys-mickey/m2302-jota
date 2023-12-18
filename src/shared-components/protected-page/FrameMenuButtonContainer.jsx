import { FrameMenuButton } from "./FrameMenuButton";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useContext } from "react";

const FrameMenuButtonContainer = (props) => {
	const { ...rest } = props;
	const { handleToggleDrawerOpen, drawerOpen } = useContext(AppFrameContext);

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
