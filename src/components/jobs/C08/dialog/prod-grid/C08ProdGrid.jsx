import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo } from "react";

import { tooltipColumn } from "@/shared-components/dsg/columns/tooltip/tooltipColumn";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import C08ProdGridAddRows from "./C08ProdGridAddRows";
import { keyColumn } from "react-datasheet-grid";
import createTooltipColumn from "@/shared-components/dsg/columns/tooltip/createTooltipColumn";
import { useMemo } from "react";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C08ProdGrid = memo((props) => {
	const {
		createRow,
		getRowKey,
		readOnly,
		gridRef,
		data,
		onChange,
		onActiveCellChange,
		// handleSelectionChange,
		getRowClassName,
		height = 300,
		...rest
	} = props;


	const duplicateRow = useCallback(
		({ rowData }) => ({ ...rowData, Pkey: nanoid() }),

		[]
	);

	const deleteRow = useCallback(({ rowData }) => {
		console.log("deleteRow", rowData);
	}, []);



	return (
		<DSGGrid
			ref={gridRef}
			rowKey={getRowKey}
			lockRows={readOnly}
			// height={height + (readOnly ? 48 : 0)}
			height={height}
			// rowHeight={42}
			value={data}
			onChange={onChange}
			onActiveCellChange={onActiveCellChange}
			// onSelectionChange={handleSelectionChange}
			// columns={columns}
			addRowsComponent={C08ProdGridAddRows}
			disableExpandSelection
			// disableContextMenu
			contextMenuComponent={ContextMenu}
			createRow={createRow}
			duplicateRow={duplicateRow}
			rowClassName={getRowClassName}
			deleteRow={deleteRow}
			{...rest}
		/>
	);
});

C08ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	spriceDisabled: PropTypes.func,
	sprodDisabled: PropTypes.func,
	sqtyDisabled: PropTypes.func,
	stypeDisabled: PropTypes.func,
	dtypeDisabled: PropTypes.func,
	overrideSQtyDisabled: PropTypes.func,
	onChange: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	handleSelectionChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	getSQtyClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
	gridRef: PropTypes.func,
	getTooltip: PropTypes.func,
	data: PropTypes.array.isRequired,
};

C08ProdGrid.displayName = "C08ProdGrid";
export default C08ProdGrid;
