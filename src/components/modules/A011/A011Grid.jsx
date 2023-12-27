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
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import NoDataBox from "../../../shared-components/NoDataBox";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const A011Grid = memo((props) => {
	const {
		lockRows,
		setGridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"ProdID",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				disabled: true,
				grow: 2,
				title: "商品代碼",
			},
			{
				...keyColumn(
					"ProdData_N",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				grow: 4,
				disabled: true,
			},
			{
				...keyColumn("Price", createFloatColumn(2)),
				title: "建議售價",
				grow: 1,
				disabled: lockRows,
			},
			{
				...keyColumn("PriceA", createFloatColumn(2)),
				title: "售價A",
				grow: 1,
				disabled: lockRows,
			},
			{
				...keyColumn("PriceB", createFloatColumn(2)),
				title: "售價B",
				grow: 1,
				disabled: lockRows,
			},
			{
				...keyColumn("PriceC", createFloatColumn(2)),
				title: "售價C",
				grow: 1,
				disabled: lockRows,
			},
			{
				...keyColumn("PriceD", createFloatColumn(2)),
				title: "售價D",
				grow: 1,
				disabled: lockRows,
			},
			{
				...keyColumn("PriceE", createFloatColumn(2)),
				title: "售價E",
				grow: 1,
				disabled: lockRows,
			},
		],
		[lockRows]
	);

	if (!data || data.legnth === 0) {
		return (
			<NoDataBox height={height} size="medium">
				輸入篩選條件後再按下讀取
			</NoDataBox>
		);
	}

	if (loading) {
		return (
			// <Container maxWidth="xs">
			<DSGLoading height={height} />
			// </Container>
		);
	}

	if (!data) {
		return false;
	}

	return (
		<Box>
			<DynamicDataSheetGrid
				lockRows={lockRows}
				ref={setGridRef}
				rowKey="CodeID"
				height={height + (lockRows ? 48 : 0)}
				value={data}
				onChange={onChange}
				columns={columns}
				addRowsComponent={DSGAddRowsToolbar}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
			/>
		</Box>
	);
});
A011Grid.propTypes = {
	lockRows: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
};

A011Grid.displayName = "A011Grid";
export default A011Grid;
