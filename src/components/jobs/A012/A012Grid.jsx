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
import { createWebApiOptionPickerColumn } from "../../../shared-components/dsg/columns/option-picker/createWebApiOptionPickerColumn";
import PkgTypes from "../../../modules/md-pkg-types";
import { pkgTypePickerColumn } from "../../dsg/columns/pkg-type-picker/pkgTypePickerColumn";

const A012Grid = memo((props) => {
	const {
		readOnly,
		setGridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		// web api
		bearer,
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
				...keyColumn("StdCost", createFloatColumn(2)),
				title: "標準成本",
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn("SafeQty", createFloatColumn(2)),
				title: "安全存量",
				grow: 1,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"bunit",
					// createWebApiOptionPickerColumn({
					// 	url: "v1/prod/pkg-types",
					// 	bearer: bearer,
					// 	getOptionLabel: PkgTypes.getOptionLabel,
					// 	isOptionEqualToValue: PkgTypes.isOptionEqualToValue,
					// })
					pkgTypePickerColumn({
						// name: "bunit",
					})
				),
				title: "庫存單位",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"sunit",
					// createWebApiOptionPickerColumn({
					// 	url: "v1/prod/pkg-types",
					// 	bearer: bearer,
					// 	getOptionLabel: PkgTypes.getOptionLabel,
					// 	isOptionEqualToValue: PkgTypes.isOptionEqualToValue,
					// })
					pkgTypePickerColumn({
						// name: "sunit",
					})
				),
				title: "銷售單位",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"iunit",
					// createWebApiOptionPickerColumn({
					// 	url: "v1/prod/pkg-types",
					// 	bearer: bearer,
					// 	getOptionLabel: PkgTypes.getOptionLabel,
					// 	isOptionEqualToValue: PkgTypes.isOptionEqualToValue,
					// })
					pkgTypePickerColumn({
						// name: "iunit",
					})
				),
				title: "進貨單位",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"munit",
					// createWebApiOptionPickerColumn({
					// 	url: "v1/prod/pkg-types",
					// 	bearer: bearer,
					// 	getOptionLabel: PkgTypes.getOptionLabel,
					// 	isOptionEqualToValue: PkgTypes.isOptionEqualToValue,
					// })
					pkgTypePickerColumn({
						// name: "munit",
					})
				),
				title: "BOM單位",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"ProdData",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				grow: 3,
				disabled: readOnly,
			},
		],
		[readOnly]
	);

	if (!data || data.legnth === 0) {
		return (
			<NoDataBox height={height} size="medium">
				輸入篩選條件後再按下[讀取資料]
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
A012Grid.propTypes = {
	readOnly: PropTypes.bool,
	setGridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	// handleActiveCellChange: PropTypes.func,
	bearer: PropTypes.string,
};

A012Grid.displayName = "A012Grid";
export default A012Grid;
