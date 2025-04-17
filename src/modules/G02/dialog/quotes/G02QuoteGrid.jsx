import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";

import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const G02QuoteGrid = memo((props) => {
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

G02QuoteGrid.propTypes = {
	getRowKey: PropTypes.func,
	onChange: PropTypes.func
};

G02QuoteGrid.displayName = "G02QuoteGrid";
export default G02QuoteGrid;

