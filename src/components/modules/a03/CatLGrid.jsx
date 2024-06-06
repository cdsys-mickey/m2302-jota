import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import {
	createTextColumn,
	keyColumn,
	DynamicDataSheetGrid,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import ContainerEx from "../../../shared-components/ContainerEx";
import DSGBox from "../../../shared-components/dsg/DSGBox";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const CatLGrid = memo((props) => {
	const {
		canCreate,
		lockRows,
		setGridRef,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
		isPersisted,
		// handleActiveCellChange,
		onSelectionChange,
		getRowClassName,
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"LClas",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				disabled: isPersisted,
				title: "代碼",
				grow: 1,
				minWidth: 60,
			},
			{
				...keyColumn(
					"ClassData",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "大分類名稱",
				grow: 5,
				disabled: lockRows,
			},
		],
		[isPersisted, lockRows]
	);

	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	if (loading) {
		return <DSGLoading height={height} />;
	}

	if (loading == null) {
		return false;
	}

	return (
		<DSGBox>
			<DynamicDataSheetGrid
				lockRows={lockRows}
				ref={setGridRef}
				rowKey="LClas"
				height={gridHeight}
				// rowHeight={42}
				value={data}
				onChange={handleChange}
				columns={columns}
				addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				onSelectionChange={onSelectionChange}
				rowClassName={getRowClassName}
			/>
		</DSGBox>
	);
});
CatLGrid.propTypes = {
	canCreate: PropTypes.bool,
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
	onSelectionChange: PropTypes.func,
	// isSelected: PropTypes.func,
	getRowClassName: PropTypes.func,
};

CatLGrid.displayName = "CatLGrid";
export default CatLGrid;
