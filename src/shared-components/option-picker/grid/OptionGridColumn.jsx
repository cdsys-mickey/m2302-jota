import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";

export const OptionGridColumn = memo(
	forwardRef((props, ref) => {
		const { children, header = false, typoVariant, ...rest } = props;
		return (
			<Grid ref={ref} item {...rest}>
				<Typography
					variant={typoVariant || header ? "subtitle2" : "body2"}>
					{children}
				</Typography>
			</Grid>
		);
	})
);

OptionGridColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	typoVariant: PropTypes.string,
	header: PropTypes.bool,
};

OptionGridColumn.displayName = "OptionGridColumn";
