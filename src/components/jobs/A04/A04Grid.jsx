import Styles from "@/modules/md-styles";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Box, Container, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import ContainerEx from "../../../shared-components/ContainerEx";
import { cyan } from "@mui/material/colors";
import DSGBox from "../../../shared-components/dsg/DSGBox";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A04Grid = memo((props) => {
	const {
		canCreate,
		lockRows,
		setGridRef,
		drawerOpen,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
		isPersisted,
		onSelectionChange,
		getRowClassName,
		...rest
	} = props;
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);

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
				title: "櫃位名稱",
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
			<DSGBox>
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
					onSelectionChange={onSelectionChange}
					// autoAddRow
					contextMenuComponent={ContextMenu}
					rowClassName={getRowClassName}
				/>
			</DSGBox>
		</ContainerEx>
	);
});
A04Grid.propTypes = {
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

A04Grid.displayName = "A04Grid";
export default A04Grid;