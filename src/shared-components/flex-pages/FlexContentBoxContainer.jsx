import React, { useMemo } from "react";
import { useFlexPagesContext } from "@/shared-contexts/FlexPagesContext";
import FlexContentBox from "./FlexContentBox";

export const FlexContentBoxContainer = React.forwardRef(({ ...rest }, ref) => {
	const flexPages = useFlexPagesContext();
	const width = useMemo(
		() =>
			`calc(100vw - ${flexPages.drawerWidth} - (${flexPages.overviewWidth}))`,
		[flexPages.drawerWidth, flexPages.overviewWidth]
	);

	return <FlexContentBox ref={ref} width={width} {...rest} />;
});
