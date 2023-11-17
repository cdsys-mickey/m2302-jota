import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGLoading from "../../../shared-components/dsg/DSGLoading";
import { stringCheckboxColumn } from "../../../shared-components/dsg/columns/stringCheckboxColumn";
import DSGAddRowsToolbar from "../DSGAddRowsToolbar";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A16Grid = memo((props) => {
	const {
		lockRows,
		setGridRef,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
		isPersisted,
		// handleActiveCellChange,
		handleCreateRow,
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"DeptID",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				disabled: isPersisted,
				title: "門市代碼",
				grow: 2,
			},
			{
				...keyColumn(
					"GroupKey",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "群組",
				grow: 1,
				disabled: lockRows,
			},
			{
				...keyColumn(
					"DeptName",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "門市名稱",
				grow: 4,
				disabled: lockRows,
			},
			{
				...keyColumn(
					"AbbrName",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "簡稱",
				grow: 2,
				disabled: lockRows,
			},
			{
				...keyColumn("Using_N", stringCheckboxColumn()),
				title: "使用中",
				minWidth: 60,
				disabled: lockRows,
			},
		],
		[isPersisted, lockRows]
	);

	if (loading) {
		return (
			<Container maxWidth="md">
				{/* <LoadingTypography>讀取中...</LoadingTypography> */}
				<DSGLoading height={height} />
			</Container>
		);
	}

	if (!data) {
		return false;
	}

	return (
		<Container maxWidth="md">
			<Box>
				{/* <LoadingBackdrop open={loading} /> */}
				<DynamicDataSheetGrid
					lockRows={lockRows}
					ref={setGridRef}
					rowKey="DeptID"
					height={height + (lockRows ? 48 : 0)}
					value={data}
					onChange={handleChange}
					columns={columns}
					addRowsComponent={DSGAddRowsToolbar}
					disableExpandSelection
					contextMenuComponent={ContextMenu}
					// onActiveCellChange={handleActiveCellChange}
					// autoAddRow
					createRow={handleCreateRow}
					duplicateRow={({ rowData }) => ({
						...rowData,
						age: rowData.int ?? 25,
						date: rowData.date ?? new Date(),
					})}
				/>
			</Box>
		</Container>
	);
});
A16Grid.propTypes = {
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
	handleCreateRow: PropTypes.func,
};

A16Grid.displayName = "A16Grid";
export default A16Grid;
