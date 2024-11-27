import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
	textColumn,
} from "react-datasheet-grid";

import { prodPickerColumn } from "@/components/dsg/columns/prod-picker/prodPickerColumn";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCallback } from "react";
import D05ProdGridAddRows from "./D05ProdGridAddRows";
import { optionPickerColumn } from "@/shared-components/dsg/columns/option-picker/optionPickerColumn";
import OutboundTypePickerComponent from "@/components/dsg/columns/outbound-type-picker/OutboundTypePickerComponent";
import { deptPickerColumn } from "@/components/dsg/columns/dept-picker/deptPickerColumn";
import { customerPickerColumn } from "@/components/dsg/columns/customer-picker/customerPickerColumn";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const D05ProdGrid = memo((props) => {
	const {
		getRowKey,
		readOnly,
		gridRef,
		data,
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
			// columns={columns}
			addRowsComponent={D05ProdGridAddRows}
			disableExpandSelection
			// disableContextMenu
			contextMenuComponent={ContextMenu}

			duplicateRow={duplicateRow}
			// rowClassName={getRowClassName}
			deleteRow={deleteRow}
			{...rest}
		/>
	);
});

D05ProdGrid.propTypes = {
	getRowKey: PropTypes.func,
	onChange: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	getSPriceClassName: PropTypes.func,
	readOnly: PropTypes.bool,
	height: PropTypes.number,
	gridRef: PropTypes.func,
	data: PropTypes.array.isRequired,
	sprodDisabled: PropTypes.func,
	dtypeDisabled: PropTypes.func,
	sqtyDisabled: PropTypes.func,
	deptDisabled: PropTypes.func,
	customerDisabled: PropTypes.func,
};

D05ProdGrid.displayName = "D05ProdGrid";
export default D05ProdGrid;
