import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { DynamicDataSheetGrid } from "react-datasheet-grid";

const DsgTest4Grid = memo(
	forwardRef((props, ref) => {
		const {
			height,
			value,
			gridRef,
			columns,
			onActiveCellChange,
			onChange,
			createRow,
		} = props;

		return (
			<div ref={ref}>
				<DynamicDataSheetGrid
					ref={gridRef}
					onChange={onChange}
					columns={columns}
					height={height}
					value={value}
					onActiveCellChange={onActiveCellChange}
					rowHeight={34}
					disableExpandSelection
					createRow={createRow}
				/>
			</div>
		);
	})
);

DsgTest4Grid.propTypes = {
	gridRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
	columns: PropTypes.array,
	onActiveCellChange: PropTypes.func,
	onChange: PropTypes.func,
	value: PropTypes.array,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	createRow: PropTypes.func,
};

DsgTest4Grid.displayName = "DsgTest4Grid";
export default DsgTest4Grid;
