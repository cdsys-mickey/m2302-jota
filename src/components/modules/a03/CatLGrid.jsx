import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import {
	createTextColumn,
	keyColumn,
	DynamicDataSheetGrid,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "../DSGAddRowsToolbar";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const CatLGrid = memo((props) => {
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
		onSelectionChange,
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

	if (loading) {
		return (
			<Container maxWidth="sm">
				<DSGLoading height={height} />
			</Container>
		);
	}

	if (!data) {
		return false;
	}

	return (
		<Container maxWidth="xs">
			<Box
				sx={{
					"& .selected-row": {
						backgroundColor: "red",
					},
				}}>
				<DynamicDataSheetGrid
					lockRows={lockRows}
					ref={setGridRef}
					rowKey="LClas"
					height={height + (lockRows ? 48 : 0)}
					value={data}
					onChange={handleChange}
					columns={columns}
					addRowsComponent={DSGAddRowsToolbar}
					disableExpandSelection
					contextMenuComponent={ContextMenu}
					onSelectionChange={onSelectionChange}
				/>
			</Box>
		</Container>
	);
});
CatLGrid.propTypes = {
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
	isSelected: PropTypes.func,
};

CatLGrid.displayName = "CatLGrid";
export default CatLGrid;
