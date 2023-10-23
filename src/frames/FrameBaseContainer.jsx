import React, { useEffect, useMemo } from "react";
import FrameBase from "./FrameBase";
import useWindowSize from "@/shared-hooks/useWindowSize";
import useAppFrame from "@/shared-contexts/useAppFrame";

export const FrameBaseContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const { drawerOpen, handleDrawerClose } = useAppFrame();

	return (
		<FrameBase
			height={height}
			handleDrawerClose={handleDrawerClose}
			drawerOpen={drawerOpen}
			menuFloating={!drawerOpen}
			{...rest}
		/>
	);
};
