import { Box } from "@mui/system";
import React from "react";
import FlexBox from "@/shared-components/FlexBox";

const FlexContentBox = React.forwardRef(({ children, ...rest }, ref) => {
	return (
		<FlexBox ref={ref} {...rest}>
			{children}
		</FlexBox>
	);
});

export default React.memo(FlexContentBox);
