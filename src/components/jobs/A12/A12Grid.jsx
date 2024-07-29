import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import ContainerEx from "../../../shared-components/ContainerEx";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A12Grid = memo((props) => {
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
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"CodeID",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				disabled: isPersisted,
				title: "代碼",
			},
			{
				...keyColumn(
					"CodeData",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "收款方式",
				grow: 4,
				disabled: lockRows,
			},
		],
		[isPersisted, lockRows]
	);

	const gridHeight = useMemo(() => {
		return height + (lockRows || !canCreate ? 48 : 0);
	}, [canCreate, height, lockRows]);

	if (loading) {
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<DSGLoading height={height} />
			</ContainerEx>
		);
	}

	if (loading == null) {
		return false;
	}

	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<Box>
				<DynamicDataSheetGrid
					lockRows={lockRows}
					ref={setGridRef}
					rowKey="CodeID"
					height={gridHeight}
					// rowHeight={42}
					value={data}
					onChange={handleChange}
					columns={columns}
					addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
					disableExpandSelection
					// disableContextMenu
					contextMenuComponent={ContextMenu}
					// autoAddRow
				/>
			</Box>
		</ContainerEx>
	);
});
A12Grid.propTypes = {
	canCreate: PropTypes.bool,
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	// handleActiveCellChange: PropTypes.func,
};

A12Grid.displayName = "A12Grid";
export default A12Grid;
