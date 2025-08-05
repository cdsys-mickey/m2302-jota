import PropTypes from "prop-types";
import { forwardRef, memo, useContext, useMemo } from "react";
import { DynamicDataSheetGrid } from "react-datasheet-grid";
import { DSGContext } from "../../../shared-contexts/datasheet-grid/DSGContext";
import DSGBox from "../DSGBox";
import DSGLoading from "../DSGLoading";

const DSGGRID_DEFAULTS = {
	rowHeight: 34,
};

export const DSGGridView = memo(
	forwardRef((props, ref) => {
		const { children, loading = false, height, loadingHeight, rowClassName, columns, value, lockRows, slotProps, ...rest } = props;
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

		if (loading) {
			return (
				<DSGBox {...slotProps?.box} >
					<DSGLoading height={loadingHeight ?? height} />
				</DSGBox>
			);
		}

		return (
			<DSGBox {...slotProps?.box}>
				<DynamicDataSheetGrid
					ref={ref}
					columns={_columns}
					rowClassName={_rowClassName}
					value={value}
					lockRows={lockRows}
					height={height}
					{...DSGGRID_DEFAULTS}
					{...rest}>
				</DynamicDataSheetGrid>
				{children}
			</DSGBox>
		);
	})
);

DSGGridView.propTypes = {
	columns: PropTypes.array,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	rowClassName: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	value: PropTypes.array,
	lockRows: PropTypes.bool,
	slotProps: PropTypes.object,
	loading: PropTypes.bool,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	loadingHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

DSGGridView.displayName = "DSGGridView";
