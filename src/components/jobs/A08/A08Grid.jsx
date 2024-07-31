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
import ContainerEx from "@/shared-components/ContainerEx";
import AreaTypes from "@/modules/md-area-types";
import { createOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createOptionPickerColumn";
import AreaTypePickerComponent from "../../dsg/columns/area-type-picker/AreaTypePickerComponent";
import { optionPickerColumn } from "../../../shared-components/dsg/columns/option-picker/optionPickerColumn";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A08Grid = memo((props) => {
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
				grow: 1,
			},
			// {
			// 	...keyColumn(
			// 		"areaType",
			// 		createOptionPickerColumn({
			// 			name: "areaType",
			// 			options: AreaTypes.options,
			// 			getOptionLabel: AreaTypes.getOptionLabel,
			// 			isOptionEqualToValue: AreaTypes.isOptionEqualToValue,
			// 		})
			// 	),
			// 	title: "範圍",
			// 	minWidth: 200,
			// 	disabled: lockRows,
			// 	grow: 1,
			// },
			{
				...keyColumn(
					"areaType",
					optionPickerColumn(AreaTypePickerComponent, {
						name: "areaType",
						disableActiveControl: true,
					})
				),
				title: "範圍",
				minWidth: 200,
				disabled: lockRows,
				grow: 1,
			},
			{
				...keyColumn(
					"CodeData",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "客戶區域",
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
			<ContainerEx maxWidth="sm" alignLeft>
				<DSGLoading height={height} />
			</ContainerEx>
		);
	}

	if (loading == null) {
		return false;
	}

	return (
		<ContainerEx maxWidth="sm" alignLeft>
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
					createRow={() => ({
						areaType: AreaTypes.findById(AreaTypes.KEY_OTHER),
					})}
				/>
			</Box>
		</ContainerEx>
	);
});
A08Grid.propTypes = {
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

A08Grid.displayName = "A08Grid";
export default A08Grid;
