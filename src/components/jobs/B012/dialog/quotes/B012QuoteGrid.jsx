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

const B012QuoteGrid = memo((props) => {
	const {
		getRowKey,
		createRow,
		readOnly,
		gridRef,
		data,
		onChange,
		getRowClassName,
		height = 300,
		bearer,
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
			onChange={onChange}
			// columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={createRow}
			duplicateRow={duplicateRow}
			rowClassName={getRowClassName}
			{...rest}
		/>
	);
});

B012QuoteGrid.propTypes = {
	getRowKey: PropTypes.func,
	onChange: PropTypes.func
};

B012QuoteGrid.displayName = "B012QuoteGrid";
export default B012QuoteGrid;


