import PropTypes from "prop-types";
import { forwardRef, memo, useContext, useMemo } from "react";
import { DynamicDataSheetGrid } from "react-datasheet-grid";
import { DSGContext } from "../../shared-contexts/datasheet-grid/DSGContext";
import DSGBox from "./DSGBox";

const DSGGRID_DEFAULTS = {
	rowHeight: 34,
};

export const DSGGrid = memo(
	forwardRef((props, ref) => {
		const { children, rowClassName, columns, value, lockRows, slotProps, ...rest } = props;
		const gridMeta = useContext(DSGContext);



		const _rowClassName = useMemo(() => {
			return rowClassName || gridMeta?.getRowClassName;
		}, [gridMeta?.getRowClassName, rowClassName]);

		const _columns = useMemo(() => {
			return columns || gridMeta?.columns;
		}, [columns, gridMeta?.columns]);

		// if (!value) {
		// 	return (
		// 		<Typography variant="body2" color="text.secondary">
		// 			(未填寫)
		// 		</Typography>
		// 	);
		// }

		// if (value?.length === 0 && lockRows) {
		// 	return (
		// 		<Typography variant="body2" color="text.secondary">
		// 			(空白)
		// 		</Typography>
		// 	);
		// }

		return (
			<DSGBox {...slotProps?.box}>
				<DynamicDataSheetGrid
					columns={_columns}
					rowClassName={_rowClassName}
					ref={ref}
					value={value}
					lockRows={lockRows}
					{...DSGGRID_DEFAULTS}
					{...rest}>
				</DynamicDataSheetGrid>
				{children}
			</DSGBox>
		);
	})
);

DSGGrid.propTypes = {
	columns: PropTypes.array,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	rowClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	value: PropTypes.array,
	lockRows: PropTypes.bool,
	slotProps: PropTypes.object
};

DSGGrid.displayName = "DSGGrid";
