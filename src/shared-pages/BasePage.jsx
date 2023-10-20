import { Box } from "@mui/material";
import React from "react";

const BasePage = ({ children, sx = [] }) => {
	return (
		<Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
			<Box>{children}</Box>
		</Box>
	);
};

export default BasePage;
