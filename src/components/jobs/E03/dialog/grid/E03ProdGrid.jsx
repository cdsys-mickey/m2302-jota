import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo } from "react";

import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import E03ProdGridAddRows from "./E03ProdGridAddRows";
import { tooltipColumn } from "@/shared-components/dsg/columns/tooltip/tooltipColumn";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const E03ProdGrid = memo((props) => {
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
		getTooltip,
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
			addRowsComponent={E03ProdGridAddRows}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={createRow}
			duplicateRow={duplicateRow}
			rowClassName={getRowClassName}
			stickyRightColumn={tooltipColumn({
				arrow: true,
				getLabel: getTooltip,
				placement: "left",
			})}
			{...rest}
		/>
	);
});

E03ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	onChange: PropTypes.func
};

E03ProdGrid.displayName = "E03ProdGrid";
export default E03ProdGrid;




