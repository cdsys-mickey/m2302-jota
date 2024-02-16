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
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const CatMGrid = memo((props) => {
	const {
		readOnly,
		setGridRef,
		data,
		loading,
		height,
		// METHODS
		handleChange,
		isPersisted,
		// handleActiveCellChange,
		onSelectionChange,
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
			{/* <LoadingBackdrop open={loading} /> */}
			<DynamicDataSheetGrid
				lockRows={readOnly}
				ref={setGridRef}
				rowKey="MClas"
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
				// rowClassName={(row) =>
				// 	isSelected(row) ? "row-selected" : null
				// }
			/>
		</Box>
		// </Container>
	);
});

CatMGrid.propTypes = {
	readOnly: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
	onSelectionChange: PropTypes.func,
};

CatMGrid.displayName = "CatMGrid";
export default CatMGrid;
