import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { FrameMenuButtonView } from "./FrameMenuButtonView";
import { useContext } from "react";

const FrameMenuButtonContainer = (props) => {
	const { ...rest } = props;
	const { handleToggleDrawerOpen } = useContext(AppFrameContext);

	return <FrameMenuButtonView onClick={handleToggleDrawerOpen} {...rest} />
}

FrameMenuButtonContainer.displayName = "FrameMenuButtonContainer";
export default FrameMenuButtonContainer;