import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import DSGBox from "../../../shared-components/dsg/DSGBox";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const CatMGrid = memo((props) => {
	const {
		canCreate,
		lockRows,
		setGridRef,
		data,
		loading,
		height,
		// METHODS
		handleChange,
		isPersisted,
		// handleActiveCellChange,
		onSelectionChange,
		// isSelected,
		getRowClassName,
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"MClas",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				disabled: isPersisted,
				title: "代碼",
				minWidth: 60,
			},
			{
				...keyColumn(
					"ClassData",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "中分類名稱",
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
			{/* <LoadingBackdrop open={loading} /> */}
			<DynamicDataSheetGrid
				lockRows={lockRows}
				ref={setGridRef}
				rowKey="MClas"
				height={gridHeight}
				// rowHeight={42}
				value={data}
				onChange={handleChange}
				columns={columns}
				addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				// onActiveCellChange={handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				rowClassName={getRowClassName}
			/>
		</DSGBox>
	);
});

CatMGrid.propTypes = {
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
	getRowClassName: PropTypes.func,
};

CatMGrid.displayName = "CatMGrid";
export default CatMGrid;
