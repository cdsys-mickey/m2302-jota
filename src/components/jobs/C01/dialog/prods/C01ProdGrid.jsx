import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo } from "react";

import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const C01ProdGrid = memo((props) => {
	const {
		getRowKey,
		readOnly,
		gridRef,
		data,
		// onChange,
		getRowClassName,
		height = 300,
		prodDisabled,
		rqtQtyDisabled,
		orderQtyDisabled,
		supplierDisabled,
		supplierNameDisabled,
		...rest
	} = props;



	const duplicateRow = useCallback(
		({ rowData }) => ({ ...rowData, Pkey: nanoid() }),

		[]
	);

	return (
		<DSGGrid
			ref={gridRef}
			rowKey={getRowKey}
			lockRows={readOnly}
			height={height + (readOnly ? 48 : 0)}
			// rowHeight={42}
			value={data}
			// onChange={onChange}
			// onActiveCellChange={onActiveCellChange}
			// columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			// createRow={createRow}
			duplicateRow={duplicateRow}
			// rowClassName={getRowClassName}
			{...rest}
		/>
	);
});

C01ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	orderQtyDisabled: PropTypes.func,
};

C01ProdGrid.displayName = "C01ProdGrid";
export default C01ProdGrid;
