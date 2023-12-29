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
		readOnly,
		setGridRef,
		drawerOpen,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
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
				disabled: readOnly,
			},
		],
		[isPersisted, readOnly]
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
					lockRows={readOnly}
					ref={setGridRef}
					rowKey="CodeID"
					height={height + (readOnly ? 48 : 0)}
					rowHeight={42}
					value={data}
					onChange={handleChange}
					columns={columns}
					addRowsComponent={DSGAddRowsToolbar}
					disableExpandSelection
					// disableContextMenu
					onSelectionChange={onSelectionChange}
					// autoAddRow
					contextMenuComponent={ContextMenu}
				/>
			</Box>
		</Container>
	);
});
A04Grid.propTypes = {
	readOnly: PropTypes.bool,
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
