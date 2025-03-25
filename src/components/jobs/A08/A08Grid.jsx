import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import ContainerEx from "@/shared-components/ContainerEx";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DSGGrid } from "../../../shared-components/dsg/DSGGrid";
import A08 from "@/modules/md-a08";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const A08Grid = memo((props) => {
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
			<DSGGrid
				lockRows={lockRows}
				ref={gridRef}
				rowKey="CodeID"
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
				createRow={A08.createRow}
			/>
		</ContainerEx>
	);
});
A08Grid.propTypes = {
	canCreate: PropTypes.bool,
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

A08Grid.displayName = "A08Grid";
export default A08Grid;
