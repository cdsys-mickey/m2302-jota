import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { DSGGrid } from "@/shared-components";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const A20ProdMaterialsGrid = memo((props) => {
	const {
		readOnly = false,
		rowKey,
		gridRef,
		data,
		onChange,
		onActiveCellChange,
		createRow,
		loading,
		height = 600,
		bearer,
		...rest
	} = props;



	if (!data) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (data?.length === 0 && readOnly) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DSGGrid
			ref={gridRef}
			// rowKey="id"
			rowKey={rowKey}
			lockRows={readOnly}
			height={height + (readOnly ? 48 : 0)}
			// rowHeight={42}
			value={data}
			onChange={onChange}
			onActiveCellChange={onActiveCellChange}
			// columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={createRow}
		/>
	);
});

A20ProdMaterialsGrid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	data: PropTypes.array,
	createRow: PropTypes.func,
};

A20ProdMaterialsGrid.displayName = "A20ProdMaterialsGrid";
export default A20ProdMaterialsGrid;
