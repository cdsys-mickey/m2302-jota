import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import DSGBox from "./DSGBox";
import { DynamicDataSheetGrid } from "react-datasheet-grid";

const DSGGRID_DEFAULTS = {
	rowHeight: 34,
};

export const DSGGrid = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<DSGBox>
				<DynamicDataSheetGrid ref={ref} {...DSGGRID_DEFAULTS} {...rest}>
					{children}
				</DynamicDataSheetGrid>
			</DSGBox>
		);
	})
);

DSGGrid.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

DSGGrid.displayName = "DSGGrid";
