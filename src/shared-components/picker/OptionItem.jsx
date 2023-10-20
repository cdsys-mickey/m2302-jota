import { Typography } from "@mui/material";
import React from "react";

const OptionItem = React.forwardRef((props, ref) => {
	const { children, ItemProps, ...rest } = props;
	return (
		<li ref={ref} {...ItemProps}>
			<Typography {...rest}>{children}</Typography>
		</li>
	);
});

export default React.memo(OptionItem);
