import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import G06 from "../../G06.mjs";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const G06ChkGrid = memo((props) => {
	const {
		readOnly = false,
		gridRef,
		data,
		columns,
		onActiveCellChange,
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
			rowKey="id"
			lockRows={readOnly}
			height={height}
			value={data}
			onActiveCellChange={onActiveCellChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={G06.createChkRow}
			{...rest}
		/>
	);
});

G06ChkGrid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	data: PropTypes.array,
	columns: PropTypes.array,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

G06ChkGrid.displayName = "G06ChkGrid";
export default G06ChkGrid;
