import FlexGrid from "@/shared-components/FlexGrid";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const FlexOptionGridColumn = memo(
	forwardRef((props, ref) => {
		const { children, header = false, typoVariant, ...rest } = props;
		return (
			<FlexGrid ref={ref} item {...rest}>
				<Typography
					variant={typoVariant || header ? "subtitle2" : "body2"}>
					{children}
				</Typography>
			</FlexGrid>
		);
	})
);

FlexOptionGridColumn.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	typoVariant: PropTypes.string,
	header: PropTypes.bool,
};

FlexOptionGridColumn.displayName = "FlexOptionGridColumn";
