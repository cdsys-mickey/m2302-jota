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
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import NoDataBox from "../../../shared-components/NoDataBox";

const A013Grid = memo((props) => {
	const {
		readOnly,
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
					"ProdData",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				grow: 4,
				disabled: readOnly,
			},
			{
				...keyColumn("SRate", createFloatColumn(4)),
				title: "銷/存",
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("IRate", createFloatColumn(4)),
				title: "進/存",
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("MRate", createFloatColumn(4)),
				title: "BOM/存",
				grow: 1,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	if (!data || data.legnth === 0) {
		return (
			<NoDataBox height={height} size="medium">
				輸入篩選條件後再按下讀取
			</NoDataBox>
		);
	}

	if (loading) {
		return <DSGLoading height={height} />;
	}

	if (loading == null) {
		return false;
	}

	return (
		<Box>
			<DynamicDataSheetGrid
				lockRows
				ref={setGridRef}
				rowKey="ProdID"
				// height={height + (readOnly ? 48 : 0)}
				height={height + 48}
				// rowHeight={42}
				value={data}
				onChange={onChange}
				columns={columns}
				addRowsComponent={DSGAddRowsToolbar}
				disableExpandSelection
				disableContextMenu
			/>
		</Box>
	);
});
A013Grid.propTypes = {
	readOnly: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
};

A013Grid.displayName = "A013Grid";
export default A013Grid;
