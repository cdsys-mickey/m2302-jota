import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { DSGGrid } from "@/shared-components";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import ContainerEx from "@/shared-components/ContainerEx";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A04Grid = memo((props) => {
	const {
		canCreate,
		lockRows,
		gridRef,
		drawerOpen,
		data,
		loading,
		height = 300,
		columns,
		// METHODS
		onChange,
		createRow,
		onSelectionChange,
		onActiveCellChange,
		getRowClassName,
		...rest
	} = props;

	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	if (loading) {
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<DSGLoading height={height} />
			</ContainerEx>
		);
	}

	if (loading == null) {
		return false;
	}

	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<DSGGrid
				lockRows={lockRows}
				ref={gridRef}
				// rowKey="CodeID"
				rowKey="id"
				height={gridHeight}
				// rowHeight={42}
				value={data}
				columns={columns}
				addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
				disableExpandSelection
				// disableContextMenu
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={onActiveCellChange}
				createRow={createRow}
				// autoAddRow
				contextMenuComponent={ContextMenu}
				rowClassName={getRowClassName}
			/>
		</ContainerEx>
	);
});
A04Grid.propTypes = {
	lockRows: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

A04Grid.displayName = "A04Grid";
export default A04Grid;
