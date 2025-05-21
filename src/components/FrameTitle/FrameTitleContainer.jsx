import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { useContext } from "react";
import FrameTitleView from "./FrameTitleView";

const FrameTitleContainer = (props) => {
	const { ...rest } = props;
	const { handleToggleDrawerOpen, drawerOpen } = useContext(AppFrameContext);
	const { mobile } = useContext(ResponsiveContext);

	return (
		<FrameTitleView
			mobile={mobile}
			onClick={handleToggleDrawerOpen}
			drawerOpen={drawerOpen}
			{...rest}
		/>)
}

FrameTitleContainer.displayName = "FrameTitleContainer";
export default FrameTitleContainer;