import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const TooltipBox = React.forwardRef(
	({ title, children, BoxProps, sx = [], ...rest }, ref) => {
		return (
			<Tooltip title={title}>
				<div ref={ref} {...rest}>
					<Box
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						{...BoxProps}>
						{children}
					</Box>
				</div>
			</Tooltip>
		);
	}
);

export default React.memo(TooltipBox);
