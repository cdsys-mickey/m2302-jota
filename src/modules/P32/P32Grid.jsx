import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import ContainerEx from "@/shared-components/ContainerEx";
import { DSGGrid } from "@/shared-components";
import P32 from "./P32.mjs";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const P32Grid = memo((props) => {
	const {
		canCreate,
		lockRows,
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		onActiveCellChange,
		onSelectionChange,
	} = props;

	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	if (loading) {
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<DSGLoading height={height} />
			</ContainerEx>
		);
	}

	if (loading == null) {
		return false;
	}

	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<Box>
				<DSGGrid
					lockRows={lockRows}
					ref={gridRef}
					// rowKey="CodeID"
					rowKey="id"
					height={gridHeight}
					// rowHeight={42}
					value={data}
					onChange={onChange}
					onActiveCellChange={onActiveCellChange}
					onSelectionChange={onSelectionChange}
					createRow={P32.createRow}
					// columns={columns}
					addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
					disableExpandSelection
					contextMenuComponent={ContextMenu}
				/>
			</Box>
		</ContainerEx>
	);
});
P32Grid.propTypes = {
	canCreate: PropTypes.bool,
	lockRows: PropTypes.bool,
	gridRef: PropTypes.func,
	vreateRow: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	onSelectionChange: PropTypes.func,
	createRow: PropTypes.func,
	isPersisted: PropTypes.func,
	columns: PropTypes.array,
	// handleActiveCellChange: PropTypes.func,
};

P32Grid.displayName = "P32Grid";
export default P32Grid;



