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
import { createMuiCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import ContainerEx from "../../../shared-components/ContainerEx";
import { checkboxColumn2 } from "../../../shared-components/dsg/columns/checkbox/checkboxColumn2";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A16Grid = memo((props) => {
	const {
		readOnly,
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
		isPersisted,
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
				disabled: readOnly,
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
				disabled: readOnly,
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
				disabled: readOnly,
			},
			{
				...keyColumn(
					"Using_N",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
					// checkboxColumn2
				),
				title: "使用中",
				minWidth: 60,
				disabled: readOnly,
			},
		],
		[isPersisted, readOnly]
	);

	if (loading) {
		return (
			<ContainerEx maxWidth="md" alginLeft>
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
			<Box>
				{/* <LoadingBackdrop open={loading} /> */}
				<DynamicDataSheetGrid
					lockRows={readOnly}
					ref={gridRef}
					rowKey="DeptID"
					height={height + (readOnly ? 48 : 0)}
					// rowHeight={42}
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
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
	handleCreateRow: PropTypes.func,
};

A16Grid.displayName = "A16Grid";
export default A16Grid;
