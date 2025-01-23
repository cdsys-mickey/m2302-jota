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

const C02ProdGrid = memo((props) => {
	const {
		getRowKey,
		createRow,
		readOnly,
		gridRef,
		data,
		// onChange,
		// onActiveCellChange,
		getRowClassName,
		height = 300,
		prodDisabled,
		rqtQtyDisabled,
		supplierNameDisabled,
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
			height={height + (readOnly ? 48 : 0)}
			// rowHeight={42}
			value={data}
			// onChange={onChange}
			// onActiveCellChange={onActiveCellChange}
			// columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
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

C02ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	onActiveCellChange: PropTypes.func,

};

C02ProdGrid.displayName = "C02ProdGrid";
export default C02ProdGrid;
