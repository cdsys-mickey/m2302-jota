import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import NoDataBox from "@/shared-components/NoDataBox";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import PropTypes from "prop-types";
import { memo } from "react";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const A22Grid = memo((props) => {
	const {
		readOnly,
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		bearer,
		getRowKey,
		handleCreateRow,
		...rest
	} = props;



	if (!data || data.legnth === 0) {
		return (
			<NoDataBox height={height} size="medium">
				輸入篩選條件後再按下讀取
			</NoDataBox>
		);
	}

	if (loading) {
		return <DSGLoading height={height} />;
	}

	if (loading == null) {
		return false;
	}

	return (
		<DSGGrid
			lockRows={readOnly}
			ref={gridRef}
			// rowKey="ProdID"
			rowKey={getRowKey}
			height={height + (readOnly ? 48 : 0)}
			// rowHeight={42}
			value={data}
			onChange={onChange}
			// columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			// disableContextMenu
			contextMenuComponent={ContextMenu}
			createRow={handleCreateRow}
			{...rest}
		/>
	);
});
A22Grid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	// handleActiveCellChange: PropTypes.func,
};

A22Grid.displayName = "A22Grid";
export default A22Grid;
