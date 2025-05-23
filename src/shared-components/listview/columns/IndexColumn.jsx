import { Box, Grid } from "@mui/material";
import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
import ListColumn from "../ListColumn";

const IndexColumn = memo(
	forwardRef(({ children, sx = [], ...rest }, ref) => {
		return (
			<ListColumn
				ref={ref}
				item
				xs={1}
				sx={[
					{
						// display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						"& *": {
							color: "rgb(0 0 0 / 50%)",
						},
					},
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				{children}
			</ListColumn>
		);
	})
);
IndexColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default IndexColumn;
