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
import DSGBox from "@/shared-components/dsg/DSGBox";
import { checkboxColumn2 } from "@/shared-components/dsg/columns/checkbox/checkboxColumn2";
import { createMuiCheckboxColumn } from "../../../../../shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import { createCheckboxColumn } from "../../../../../shared-components/dsg/columns/checkbox/createCheckboxColumn";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

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
		onChange,
		isPersisted,
		handleCreateRow,
		isKeyDisabled,
		getOptionLabel,
		isOptionEqualToValue,
		getData,
		// web api
		bearer,
		getRowClassName,
		...rest
	} = props;

	const columns = useMemo(
		() => [
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
					createCheckboxColumn({
						size: "medium",
					})
				),
				// ...keyColumn("INQ", createMuiCheckboxColumn()),
				title: "查",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"INS",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "增",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"UPD",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "改",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"PRT",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "印",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"DEL",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "刪",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"USI",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "停",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"CHK",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "審",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"NCK",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "退",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"RUN",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "執",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"EXP",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "出",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"IMP",
					createCheckboxColumn({
						size: "medium",
					})
				),
				title: "入",
				minWidth: 30,
				disabled: readOnly,
			},
			// -------------------- Built-In Checkbox Column --------------------
			// {
			// 	...keyColumn("INQ", bheckboxColumn),
			// 	title: "查",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("INS", bheckboxColumn),
			// 	title: "增",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("UPD", bheckboxColumn),
			// 	title: "改",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("PRT", bheckboxColumn),
			// 	title: "印",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("DEL", bheckboxColumn),
			// 	title: "刪",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("USI", bheckboxColumn),
			// 	title: "停",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("CHK", bheckboxColumn),
			// 	title: "審",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("NCK", bheckboxColumn),
			// 	title: "退",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("RUN", bheckboxColumn),
			// 	title: "執",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("EXP", bheckboxColumn),
			// 	title: "出",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("IMP", bheckboxColumn),
			// 	title: "入",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
		],
		[readOnly]
	);

	if (loading) {
		return (
			<Container maxWidth="md">
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
				onChange={onChange}
				columns={columns}
				// addRowsComponent={DSGAddRowsToolbar}
				addRowsComponent={null}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
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
	isPersisted: PropTypes.func,
	handleActiveCellChange: PropTypes.func,
	handleCreateRow: PropTypes.func,
	bearer: PropTypes.string,
	rowKey: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
};

ZA03Grid.displayName = "ZA03Grid";
export default ZA03Grid;
