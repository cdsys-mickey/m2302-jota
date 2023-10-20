import React, { useEffect, useMemo } from "react";
import FrameBase from "./FrameBase";
import useWindowSize from "@/shared-hooks/useWindowSize";
import useProtectedLayout from "@/shared-contexts/useProtectedLayout";

export const FrameBaseContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const { drawerOpen, handleDrawerClose } = useProtectedLayout();

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
