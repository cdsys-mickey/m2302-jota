import PropTypes from "prop-types";
import { forwardRef, memo, useState } from "react";
import { DynamicDataSheetGrid } from "react-datasheet-grid";
import { DataSheetGrid } from "react-datasheet-grid";

const DsgTest4Grid = memo(
	forwardRef((props, ref) => {
		const { value, gridRef, columns, onActiveCellChange, onChange } = props;

		return (
			<div ref={ref}>
				<DynamicDataSheetGrid
					ref={gridRef}
					onChange={onChange}
					columns={columns}
					height={500}
					value={value}
					onActiveCellChange={onActiveCellChange}
					rowHeight={34}
					disableExpandSelection
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
};

DsgTest4Grid.displayName = "DsgTest4Grid";
export default DsgTest4Grid;
