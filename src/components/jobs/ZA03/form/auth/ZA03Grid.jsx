import DSGBox from "@/shared-components/dsg/DSGBox";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createCheckboxColumn2 } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn2";

// const ContextMenu = createDSGContextMenuComponent({
// 	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
// });

const ZA03Grid = memo((props) => {
	const {
		uid,
		rowKey,
		readOnly,
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		handleChange,
		handleSelectionChange,
		getRowClassName,
		funcDisabled,
		...rest
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"enabled",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"JobID",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "代號",
				grow: 1,
				disabled: true,
				minWidth: 70,
				maxWidth: 70,
			},
			{
				...keyColumn(
					"JobName_N",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "名稱",
				grow: 1,
				disabled: true,
				minWidth: 240,
			},

			{
				...keyColumn(
					"INQ",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "查",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"INS",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "增",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"UPD",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "改",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"PRT",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "印",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"DEL",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "刪",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"USI",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "停",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"CHK",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "審",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"NCK",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "退",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"RUN",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "執",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"EXP",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "出",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn(
					"IMP",
					createCheckboxColumn2({
						size: "medium",
					})
				),
				title: "入",
				minWidth: 38,
				maxWidth: 38,
				disabled: readOnly || funcDisabled,
			},
			{
				...keyColumn("Seq", createFloatColumn(2)),
				title: "排序",
				minWidth: 90,
				maxWidth: 90,
				disabled: readOnly,
			},
		],
		[funcDisabled, readOnly]
	);

	if (loading) {
		return (
			<Container maxWidth="lg">
				{/* <LoadingTypography>讀取中...</LoadingTypography> */}
				<DSGLoading height={height} />
			</Container>
		);
	}

	if (loading == null) {
		return false;
	}

	return (
		<DSGBox>
			{/* <LoadingBackdrop open={loading} /> */}
			<DynamicDataSheetGrid
				// lockRows={true}
				lockRows={readOnly}
				ref={gridRef}
				// rowKey="DeptID"
				// rowKey={rowKey}
				// rowKey="JobID"
				// height={height + (readOnly ? 48 : 0)}
				// height={height + 48}
				height={height}
				// rowHeight={42}
				value={data}
				onChange={handleChange}
				onSelectionChange={handleSelectionChange}
				columns={columns}
				// addRowsComponent={DSGAddRowsToolbar}
				addRowsComponent={null}
				disableExpandSelection
				disableContextMenu
				// contextMenuComponent={ContextMenu}
				rowClassName={getRowClassName}
				{...rest}
			/>
		</DSGBox>
	);
});
ZA03Grid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	getRowClassName: PropTypes.func,
	funcDisabled: PropTypes.func,
	handleChange: PropTypes.func,
	handleSelectionChange: PropTypes.func,
	rowKey: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
};

ZA03Grid.displayName = "ZA03Grid";
export default ZA03Grid;
