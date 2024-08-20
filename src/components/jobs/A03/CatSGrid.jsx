import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid
} from "react-datasheet-grid";
import DSGBox from "../../../shared-components/dsg/DSGBox";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const CatSGrid = memo((props) => {
	const {
		canCreate,
		lockRows,
		setGridRef,
		columns,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		createRow,
		onSelectionChange,
		onActiveCellChange,
		getRowClassName,
	} = props;

	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	// if (loading) {
	// 	return (
	// 		<DSGLoading height={height} />
	// 	);
	// }

	if (loading == null) {
		return false;
	}

	return (
		// <Container maxWidth="xs">
		<DSGBox>
			<DynamicDataSheetGrid
				lockRows={lockRows}
				ref={setGridRef}
				rowKey="SClas"
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
				// autoAddRow
				rowClassName={getRowClassName}
			/>
		</DSGBox>
		// </Container>
	);
});
CatSGrid.propTypes = {
	canCreate: PropTypes.bool,
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	onSelectionChange: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	createRow: PropTypes.func,
	getRowClassName: PropTypes.func,
	columns: PropTypes.array,
};

CatSGrid.displayName = "CatSGrid";
export default CatSGrid;
