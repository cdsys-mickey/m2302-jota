import { Box, Grid } from "@mui/material";
import React from "react";

const IndexCell = React.forwardRef(({ children, sx = [], ...rest }, ref) => {
	return (
		<Grid
			item
			xs={1}
			sx={[
				{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					"& *": {
						color: "rgb(0 0 0 / 50%)",
					},
				},
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
			<Box pr={1}>{children}</Box>
		</Grid>
	);
});

export default React.memo(IndexCell);
