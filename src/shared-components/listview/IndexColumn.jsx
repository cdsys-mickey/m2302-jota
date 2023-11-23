import { Box, Grid } from "@mui/material";
import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
const IndexColumn = memo(
	forwardRef(({ children, sx = [], ...rest }, ref) => {
		return (
			<Grid
				ref={ref}
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
				]}
				{...rest}>
				<Box pr={1}>{children}</Box>
			</Grid>
		);
	})
);
IndexColumn.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default IndexColumn;
