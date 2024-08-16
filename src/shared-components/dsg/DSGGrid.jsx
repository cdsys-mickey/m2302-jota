import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import DSGBox from "./DSGBox";
import { DynamicDataSheetGrid } from "react-datasheet-grid";
import { useContext } from "react";
import { DSGContext } from "../../shared-contexts/datasheet-grid/DSGContext";
import { useMemo } from "react";

const DSGGRID_DEFAULTS = {
	rowHeight: 34,
};

export const DSGGrid = memo(
	forwardRef((props, ref) => {
		const { children, rowClassName, columns, ...rest } = props;
		const gridMeta = useContext(DSGContext);

		const _rowClassName = useMemo(() => {
			return rowClassName || gridMeta?.getRowClassName;
		}, [gridMeta?.getRowClassName, rowClassName]);

		const _columns = useMemo(() => {
			return columns || gridMeta?.columns;
		}, [columns, gridMeta?.columns]);

		return (
			<DSGBox>
				<DynamicDataSheetGrid
					columns={_columns}
					rowClassName={_rowClassName}
					ref={ref}
					{...DSGGRID_DEFAULTS}
					{...rest}>
					{children}
				</DynamicDataSheetGrid>
			</DSGBox>
		);
	})
);

DSGGrid.propTypes = {
	columns: PropTypes.array,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	rowClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

DSGGrid.displayName = "DSGGrid";
