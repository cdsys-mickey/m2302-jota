import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const CatMGrid = memo((props) => {
	const {
		canCreate,
		lockRows,
		setGridRef,
		columns,
		data,
		loading,
		height,
		// METHODS
		onChange,
		onSelectionChange,
		onActiveCellChange,
		createRow,
		// isSelected,
		getRowClassName,
	} = props;

	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	// if (loading) {
	// 	return <DSGLoading height={height} />;
	// }

	if (loading == null) {
		return false;
	}

	return (
		<DSGGrid
			lockRows={lockRows}
			ref={setGridRef}
			rowKey="MClas"
			height={gridHeight}
			// rowHeight={42}
			value={data}
			columns={columns}
			addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			onChange={onChange}
			onSelectionChange={onSelectionChange}
			onActiveCellChange={onActiveCellChange}
			createRow={createRow}
			rowClassName={getRowClassName}
		/>
	);
});

CatMGrid.propTypes = {
	canCreate: PropTypes.bool,
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	// handleActiveCellChange: PropTypes.func,
	onSelectionChange: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	createRow: PropTypes.func,
	getRowClassName: PropTypes.func,
	columns: PropTypes.array,
};

CatMGrid.displayName = "CatMGrid";
export default CatMGrid;
