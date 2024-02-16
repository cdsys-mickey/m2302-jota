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
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const CatSGrid = memo((props) => {
	const {
		readOnly,
		setGridRef,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
		isPersisted,
		onSelectionChange,
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"SClas",
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
				title: "小分類名稱",
				grow: 5,
				disabled: readOnly,
			},
		],
		[isPersisted, readOnly]
	);

	if (loading) {
		return (
			// <Container maxWidth="sm">
			<DSGLoading height={height} />
			// </Container>
		);
	}

	if (!data) {
		return false;
	}

	return (
		// <Container maxWidth="xs">
		<Box>
			<DynamicDataSheetGrid
				lockRows={readOnly}
				ref={setGridRef}
				rowKey="SClas"
				height={height + (readOnly ? 48 : 0)}
				rowHeight={42}
				value={data}
				onChange={handleChange}
				columns={columns}
				addRowsComponent={DSGAddRowsToolbar}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				// onActiveCellChange={handleActiveCellChange}
				onSelectionChange={onSelectionChange}
				// autoAddRow
			/>
		</Box>
		// </Container>
	);
});
CatSGrid.propTypes = {
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

CatSGrid.displayName = "CatSGrid";
export default CatSGrid;
