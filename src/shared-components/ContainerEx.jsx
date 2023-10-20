import { Container } from "@mui/material";
import React from "react";

const ContainerEx = React.forwardRef((props, ref) => {
	const { children, sx = [], ...rest } = props;
	return (
		<Container
			ref={ref}
			sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
			{...rest}>
			{children}
		</Container>
	);
});

export default React.memo(ContainerEx);
