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
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import NoDataBox from "../../../shared-components/NoDataBox";

const A015Grid = memo((props) => {
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
				grow: 1,
				title: "商品代碼",
			},
			{
				...keyColumn(
					"PackData_N",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "包裝單位",
				grow: 1,
				disabled: true,
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
				...keyColumn("SafeQty", createFloatColumn(2)),
				title: "安全存量",
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
A015Grid.propTypes = {
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

A015Grid.displayName = "A015Grid";
export default A015Grid;
