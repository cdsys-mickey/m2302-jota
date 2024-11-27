import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A01ProdComboGrid = memo((props) => {
	const {
		lockRows = false,
		gridRef,
		data,
		handleGridChange,
		onActiveCellChange,
		columns,
		height = 600,
		...rest
	} = props;


	if (!data) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (data?.length === 0 && lockRows) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DSGGrid
			ref={gridRef}
			rowKey="id"
			height={height}
			rowHeight={34}
			value={data}
			onChange={handleGridChange}
			onActiveCellChange={onActiveCellChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			{...rest}
		/>
	);
});

A01ProdComboGrid.propTypes = {
	lockRows: PropTypes.bool,
	gridRef: PropTypes.func,
	handleGridChange: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	data: PropTypes.array,
	columns: PropTypes.array,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

A01ProdComboGrid.displayName = "ProdComboGrid";
export default A01ProdComboGrid;
