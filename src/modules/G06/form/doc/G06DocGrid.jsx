import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { DSGGrid } from "@/shared-components";
import G06 from "../../G06.mjs";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const G06DocGrid = memo((props) => {
	const {
		readOnly = false,
		canCreate = false,
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
			lockRows={true}
			height={height}
			value={data}
			onActiveCellChange={onActiveCellChange}
			columns={columns}
			addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={G06.createCashRow}
			{...rest}
		/>
	);
});

G06DocGrid.propTypes = {
	readOnly: PropTypes.bool,
	canCreate: PropTypes.bool,
	gridRef: PropTypes.func,
	onActiveCellChange: PropTypes.func,
	data: PropTypes.array,
	columns: PropTypes.array,
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

G06DocGrid.displayName = "G06DocGrid";
export default G06DocGrid;
