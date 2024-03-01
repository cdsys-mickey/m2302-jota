import Styles from "@/modules/md-styles";
import LoadingBackdrop from "@/shared-components/LoadingBackdrop";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Box, Container, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import ContainerEx from "../../../shared-components/ContainerEx";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A26Grid = memo((props) => {
	const {
		canCreate,
		lockRows,
		setGridRef,
		drawerOpen,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		isPersisted,
		onSelectionChange,
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
				minWidth: 70,
				title: "代碼",
				disabled: isPersisted,
			},
			{
				...keyColumn(
					"CodeData",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "佣金類別",
				grow: 5,
				disabled: lockRows,
			},
			{
				...keyColumn("Other1", createFloatColumn(1)),
				title: "佣金比例",
				minWidth: 120,
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
				{/* <LoadingTypography>讀取中...</LoadingTypography> */}
				<DSGLoading height={height} />
			</ContainerEx>
		);
	}

	if (!data) {
		return false;
	}

	return (
		<>
			<LoadingBackdrop open={loading} />
			{/* <Box sx={boxStyles} {...rest}> */}
			<ContainerEx maxWidth="xs" alignLeft>
				<DynamicDataSheetGrid
					lockRows={lockRows}
					ref={setGridRef}
					rowKey="CodeID"
					height={gridHeight}
					rowHeight={42}
					value={data}
					onChange={onChange}
					columns={columns}
					addRowsComponent={canCreate ? DSGAddRowsToolbar : null}
					disableExpandSelection
					contextMenuComponent={ContextMenu}
					onSelectionChange={onSelectionChange}
					// autoAddRow
				/>
			</ContainerEx>
			{/* </Box> */}
		</>
	);
});
A26Grid.propTypes = {
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

A26Grid.displayName = "A26Grid";
export default A26Grid;
