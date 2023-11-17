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
import DSGAddRowsToolbar from "../DSGAddRowsToolbar";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const CatMGrid = memo((props) => {
	const {
		lockRows,
		setGridRef,
		data,
		loading,
		height,
		// METHODS
		handleChange,
		isPersisted,
		// handleActiveCellChange,
		handleSelectionChange,
		// isSelected,
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

	if (loading) {
		return (
			<Container maxWidth="sm">
				{/* <LoadingTypography>讀取中...</LoadingTypography> */}
				{/* {_.range(10).map((i) => (
						<Skeleton key={i} height={45} />
					))} */}
				<DSGLoading height={height} />
			</Container>
		);
	}

	if (!data) {
		return false;
	}

	return (
		<Container maxWidth="xs">
			<Box>
				{/* <LoadingBackdrop open={loading} /> */}
				<DynamicDataSheetGrid
					lockRows={lockRows}
					ref={setGridRef}
					rowKey="MClas"
					height={height + (lockRows ? 48 : 0)}
					value={data}
					onChange={handleChange}
					columns={columns}
					addRowsComponent={DSGAddRowsToolbar}
					disableExpandSelection
					contextMenuComponent={ContextMenu}
					// onActiveCellChange={handleActiveCellChange}
					onSelectionChange={handleSelectionChange}
					// autoAddRow
					// rowClassName={(row) =>
					// 	isSelected(row) ? "row-selected" : null
					// }
				/>
			</Box>
		</Container>
	);
});

CatMGrid.propTypes = {
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
	handleSelectionChange: PropTypes.func,
};

CatMGrid.displayName = "CatMGrid";
export default CatMGrid;
