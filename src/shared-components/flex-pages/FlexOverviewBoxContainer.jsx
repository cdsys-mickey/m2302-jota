import MdExchange from "@/modules/md-exchange";
import React, { useMemo } from "react";
import { useFlexPagesContext } from "@/shared-contexts/FlexPagesContext";
import FlexContentBox from "./FlexContentBox";
import FlexOverviewBox from "./FlexOverviewBox";

export const FlexOverviewBoxContainer = React.forwardRef(({ ...rest }, ref) => {
	const flexPages = useFlexPagesContext();

	return (
		<FlexOverviewBox
			ref={ref}
			width={MdExchange.OVEWVIEW_WIDTH}
			{...rest}
		/>
	);
});
