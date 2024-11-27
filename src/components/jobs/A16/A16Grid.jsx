import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import PropTypes from "prop-types";
import { memo } from "react";
import ContainerEx from "@/shared-components/ContainerEx";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const A16Grid = memo((props) => {
	const {
		readOnly,
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		onSelectionChange,
		onActiveCellChange,
		...rest
	} = props;



	if (loading) {
		return (
			<ContainerEx maxWidth="md" alignLeft>
				{/* <LoadingTypography>讀取中...</LoadingTypography> */}
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
				lockRows={readOnly}
				ref={gridRef}
				// rowKey="DeptID"
				rowKey="id"
				height={height + (readOnly ? 48 : 0)}
				value={data}
				onChange={onChange}
				onSelectionChange={onSelectionChange}
				onActiveCellChange={onActiveCellChange}
				addRowsComponent={DSGAddRowsToolbar}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				{...rest}

			/>
		</ContainerEx>
	);
});
A16Grid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	onSelectionChange: PropTypes.func,
	onActiveCellChange: PropTypes.func,
};

A16Grid.displayName = "A16Grid";
export default A16Grid;
