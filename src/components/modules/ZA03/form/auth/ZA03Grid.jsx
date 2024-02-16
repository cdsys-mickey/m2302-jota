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
import { createMuiCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import { createWebApiOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createWebApiOptionPickerColumn";
import ZA03 from "@/modules/md-za03";
import QueryString from "query-string";
import { useCallback } from "react";

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
		handleChange,
		isPersisted,
		handleCreateRow,
		isKeyDisabled,
		getOptionLabel,
		isOptionEqualToValue,
		getData,
		// web api
		bearer,
	} = props;

	const columns = useMemo(
		() => [
			// {
			// 	...keyColumn(
			// 		"JobID",
			// 		createWebApiOptionPickerColumn({
			// 			url: "v1/ou/user/unused-jobs",
			// 			queryString: QueryString.stringify({
			// 				uid: uid,
			// 			}),
			// 			bearer: bearer,
			// 			getData: getData,
			// 		})
			// 	),
			// 	title: "功能",
			// 	// grow: 4,
			// 	disabled: isKeyDisabled,
			// 	minWidth: 220,
			// },
			// {
			// 	...keyColumn(
			// 		"module",
			// 		createWebApiOptionPickerColumn({
			// 			url: "v1/ou/user/unused-authorities",
			// 			queryString: QueryString.stringify({
			// 				uid: uid,
			// 			}),
			// 			bearer: token,
			// 			getOptionLabel: getOptionLabel,
			// 			isOptionEqualToValue: isOptionEqualToValue,
			// 			getData: getData,
			// 		})
			// 	),
			// 	title: "功能",
			// 	// grow: 4,
			// 	disabled: isKeyDisabled,
			// 	minWidth: 220,
			// },
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
				minWidth: 60,
			},
			{
				...keyColumn(
					"JobName",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "名稱",
				grow: 1,
				disabled: true,
				minWidth: 160,
			},

			{
				...keyColumn(
					"INQ",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "查",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"INS",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "增",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"UPD",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "改",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"PRT",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "印",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"DEL",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "刪",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"USI",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "停",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"CHK",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "審",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"NCK",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "退",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"RUN",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "執",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"EXP",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "出",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"IMP",
					createMuiCheckboxColumn({
						trueValue: "1",
						falseValue: "0",
					})
				),
				title: "入",
				minWidth: 30,
				disabled: readOnly,
			},
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

	if (!data) {
		return false;
	}

	return (
		<Container maxWidth="md">
			<Box>
				{/* <LoadingBackdrop open={loading} /> */}
				<DynamicDataSheetGrid
					// lockRows={true}
					lockRows={readOnly}
					ref={gridRef}
					// rowKey="DeptID"
					// rowKey={rowKey}
					rowKey="JobID"
					// height={height + (readOnly ? 48 : 0)}
					height={height + 48}
					rowHeight={42}
					value={data}
					onChange={handleChange}
					columns={columns}
					// addRowsComponent={DSGAddRowsToolbar}
					addRowsComponent={null}
					disableExpandSelection
					contextMenuComponent={ContextMenu}
					// onActiveCellChange={handleActiveCellChange}
					// autoAddRow
					// createRow={handleCreateRow}
					// stickyRightColumn={{
					// 	component: ({ deleteRow }) => (
					// 		<button onClick={deleteRow}>❌</button>
					// 	),
					// }}
				/>
			</Box>
		</Container>
	);
});
ZA03Grid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	handleChange: PropTypes.func,
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
