import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createMuiCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createMuiCheckboxColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Box, Container } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	checkboxColumn,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import MuiCheckboxColumn from "../../../../../shared-components/dsg/columns/checkbox/MuiCheckboxColumn";

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
				...keyColumn("INQ", createMuiCheckboxColumn()),
				title: "查",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("INS", createMuiCheckboxColumn()),
				title: "增",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("UPD", createMuiCheckboxColumn()),
				title: "改",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("PRT", createMuiCheckboxColumn()),
				title: "印",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("DEL", createMuiCheckboxColumn()),
				title: "刪",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("USI", createMuiCheckboxColumn()),
				title: "停",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("CHK", createMuiCheckboxColumn()),
				title: "審",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("NCK", createMuiCheckboxColumn()),
				title: "退",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("RUN", createMuiCheckboxColumn()),
				title: "執",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("EXP", createMuiCheckboxColumn()),
				title: "出",
				minWidth: 30,
				disabled: readOnly,
			},
			{
				...keyColumn("IMP", createMuiCheckboxColumn()),
				title: "入",
				minWidth: 30,
				disabled: readOnly,
			},
			// -------------------- Built-In Checkbox Column --------------------
			// {
			// 	...keyColumn("INQ", checkboxColumn),
			// 	title: "查",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("INS", checkboxColumn),
			// 	title: "增",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("UPD", checkboxColumn),
			// 	title: "改",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("PRT", checkboxColumn),
			// 	title: "印",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("DEL", checkboxColumn),
			// 	title: "刪",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("USI", checkboxColumn),
			// 	title: "停",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("CHK", checkboxColumn),
			// 	title: "審",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("NCK", checkboxColumn),
			// 	title: "退",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("RUN", checkboxColumn),
			// 	title: "執",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("EXP", checkboxColumn),
			// 	title: "出",
			// 	minWidth: 30,
			// 	disabled: readOnly,
			// },
			// {
			// 	...keyColumn("IMP", checkboxColumn),
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

	if (!data) {
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
				rowHeight={42}
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
