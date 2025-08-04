import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DSGGrid } from "@/shared-components";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const CatLGrid = memo((props) => {
	const {
		canCreate,
		lockRows,
		setGridRef,
		data,
		columns,
		loading,
		height = 300,
		// METHODS
		onChange,
		onSelectionChange,
		onActiveCellChange,
		createRow,
		getRowClassName,
	} = props;

	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	if (loading) {
		return <DSGLoading height={height} />;
	}

	if (loading == null) {
		return false;
	}

	return (
		<DSGGrid
			lockRows={lockRows}
			ref={setGridRef}
			rowKey="LClas"
			height={gridHeight}
			// rowHeight={42}
			value={data}
			onChange={onChange}
			columns={columns}
			addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			onSelectionChange={onSelectionChange}
			onActiveCellChange={onActiveCellChange}
			createRow={createRow}
			rowClassName={getRowClassName}
		/>
	);
});
CatLGrid.propTypes = {
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
	// isSelected: PropTypes.func,
	getRowClassName: PropTypes.func,
	columns: PropTypes.array,
};

CatLGrid.displayName = "CatLGrid";
export default CatLGrid;
