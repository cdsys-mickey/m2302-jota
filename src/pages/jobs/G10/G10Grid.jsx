import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import ContainerEx from "@/shared-components/ContainerEx";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import G10 from "@/pages/jobs/G10/G10.mjs";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const G10Grid = memo((props) => {
	const {
		canCreate,
		columns,
		lockRows,
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
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
		<ContainerEx maxWidth="md" alignLeft>
			<DSGGrid
				lockRows={lockRows}
				ref={gridRef}
				rowKey="PosNo"
				height={gridHeight}
				// rowHeight={42}
				value={data}
				onChange={onChange}
				columns={columns}
				addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
				disableExpandSelection
				// disableContextMenu
				contextMenuComponent={ContextMenu}
				// autoAddRow
				createRow={G10.createRow}
			/>
		</ContainerEx>
	);
});
G10Grid.propTypes = {
	columns: PropTypes.array,
	lockRows: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	// handleActiveCellChange: PropTypes.func,
};

G10Grid.displayName = "G10Grid";
export default G10Grid;






