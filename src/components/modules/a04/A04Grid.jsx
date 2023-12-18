import Styles from "@/modules/md-styles";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Box, Container, useTheme } from "@mui/material";
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

const A04Grid = memo((props) => {
	const {
		lockRows,
		setGridRef,
		drawerOpen,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
		isPersisted,
		handleSelectionChange,
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
		<Container maxWidth="sm">
			<Box sx={boxStyles} {...rest}>
				<DynamicDataSheetGrid
					lockRows={lockRows}
					ref={setGridRef}
					rowKey="CodeID"
					height={height + (lockRows ? 48 : 0)}
					value={data}
					onChange={handleChange}
					columns={columns}
					addRowsComponent={DSGAddRowsToolbar}
					disableExpandSelection
					// disableContextMenu
					onSelectionChange={handleSelectionChange}
					// autoAddRow
					contextMenuComponent={ContextMenu}
				/>
			</Box>
		</Container>
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
	handleSelectionChange: PropTypes.func,
};

A04Grid.displayName = "A04Grid";
export default A04Grid;
