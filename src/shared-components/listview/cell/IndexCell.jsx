import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const IndexCell = memo((props) => {
	const { children, sx = [], ...rest } = props;
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
			]}
			{...rest}>
			<Box pr={1}>{children}</Box>
		</Grid>
	);
});

IndexCell.propTypes = {
	children: PropTypes.node,
	sx: PropTypes.array,
};

IndexCell.displayName = "IndexCell";
export default IndexCell;
