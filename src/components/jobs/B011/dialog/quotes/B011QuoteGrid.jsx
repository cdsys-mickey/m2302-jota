import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo } from "react";

import { DSGGrid } from "@/shared-components";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";

// 移至 Container 判斷
// const ContextMenu = createDSGContextMenuComponent({
// 	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
// });

const B011QuoteGrid = memo((props) => {
	const {
		getRowKey,
		createRow,
		readOnly,
		gridRef,
		data,
		creating,
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

			disableExpandSelection
			// 移至 Container 判斷
			// contextMenuComponent={ContextMenu}
			createRow={createRow}
			duplicateRow={duplicateRow}
			rowClassName={getRowClassName}
			{...rest}
		/>
	);
});

B011QuoteGrid.propTypes = {
	getRowKey: PropTypes.func,
	onChange: PropTypes.func,
	creating: PropTypes.bool
};

B011QuoteGrid.displayName = "B011QuoteGrid";
export default B011QuoteGrid;

