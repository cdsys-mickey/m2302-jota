import { Box, Paper } from "@mui/material";
import React from "react";

const PopperBox = React.forwardRef((props, ref) => {
	const { children, width, ...rest } = props;
	return (
		<Box ref={ref} sx={{ marginTop: "2px" }}>
			<Paper
				elevation={8}
				component={Box}
				sx={{
					width: width,
					// bgcolor: "rgb(255 255 255 / 80%)",
					// backdropFilter: "blur(10px)",
				}}
				p={2}
				{...rest}>
				{children}
			</Paper>
		</Box>
	);
});

export default React.memo(PopperBox);
