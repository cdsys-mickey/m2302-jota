import useContainerSize from "@/shared-hooks/useContainerSize";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ResponsiveGridItem from "./ResponsiveGridItem";
import ResponsiveGridProvider from "./ResponsiveGridProvider";

export const ResponsiveGrid = memo((props) => {
	const { container = false, item, children, columns = 12, initSize, ...rest } = props;
	const { containerRef, ...containerOpts } = useContainerSize();

	if (!container || item) {
		return (
			<ResponsiveGridItem {...rest}>
				{children}
			</ResponsiveGridItem>
		);
	}

	return (
		<ResponsiveGridProvider containerRef={containerRef} columns={columns} initSize={initSize} {...containerOpts}>
			<div ref={containerRef}>
				<Grid container={container} columns={columns} {...rest}>
					{children}
				</Grid>
			</div>
		</ResponsiveGridProvider>
	);
});

ResponsiveGrid.propTypes = {
	initSize: PropTypes.string,
	columns: PropTypes.number,
	container: PropTypes.bool,
	item: PropTypes.bool,
	xs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}

ResponsiveGrid.displayName = "ResponsiveGrid";