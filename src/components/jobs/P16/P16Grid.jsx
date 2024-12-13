import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import AreaTypes from "@/modules/md-area-types";
import ContainerEx from "@/shared-components/ContainerEx";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DSGGrid } from "../../../shared-components/dsg/DSGGrid";
import P16 from "@/modules/md-p16";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const P16Grid = memo((props) => {
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
		<ContainerEx maxWidth="sm" alignLeft>
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
				createRow={P16.createRow}
			/>
		</ContainerEx>
	);
});
P16Grid.propTypes = {
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

P16Grid.displayName = "P16Grid";
export default P16Grid;

