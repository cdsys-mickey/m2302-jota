import { useContext } from "react";
import FrameTitle from "./FrameTitle";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";

const FrameTitleContainer = (props) => {
	const { ...rest } = props;
	const { handleToggleDrawerOpen, drawerOpen } = useContext(AppFrameContext);
	const { mobile } = useContext(ResponsiveContext);

	return (
		<FrameTitle
			mobile={mobile}
			onClick={handleToggleDrawerOpen}
			drawerOpen={drawerOpen}
			{...rest}
		/>)
}

FrameTitleContainer.displayName = "FrameTitleContainer";
export default FrameTitleContainer;