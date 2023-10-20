import { Box } from "@mui/system";
import React from "react";

const FlexOverviewBox = React.forwardRef(({ children, ...rest }, ref) => {
	return (
		<Box ref={ref} {...rest}>
			{children}
		</Box>
	);
});

export default React.memo(FlexOverviewBox);
