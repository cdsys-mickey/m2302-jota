import { Alert } from "@mui/material";
import React from "react";

const AlertEx = React.forwardRef((props, ref) => {
	const { sx = [], transparent, children, flex, maxWidth, ...rest } = props;

	return (
		<Alert
			ref={ref}
			sx={[
				{
					justifyContent: "center",
				},
				transparent && {
					padding: 0,
					backgroundColor: "transparent",
				},
				flex && {
					flex: flex,
				},
				maxWidth && {
					maxWidth,
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{children}
		</Alert>
	);
});

export default AlertEx;
