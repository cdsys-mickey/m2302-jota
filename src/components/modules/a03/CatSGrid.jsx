import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import DSGBox from "../../../shared-components/dsg/DSGBox";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const CatSGrid = memo((props) => {
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
		onSelectionChange,
		getRowClassName,
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"SClas",
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
				title: "小分類名稱",
				grow: 5,
				disabled: lockRows,
			},
		],
		[isPersisted, lockRows]
	);

	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	// if (loading) {
	// 	return (
	// 		<DSGLoading height={height} />
	// 	);
	// }

	if (loading == null) {
		return false;
	}

	return (
		// <Container maxWidth="xs">
		<DSGBox>
			<DynamicDataSheetGrid
				lockRows={lockRows}
				ref={setGridRef}
				rowKey="SClas"
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
				// autoAddRow
				rowClassName={getRowClassName}
			/>
		</DSGBox>
		// </Container>
	);
});
CatSGrid.propTypes = {
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	onSelectionChange: PropTypes.func,
	getRowClassName: PropTypes.func,
};

CatSGrid.displayName = "CatSGrid";
export default CatSGrid;
