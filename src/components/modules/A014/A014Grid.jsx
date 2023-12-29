import ProdTypeAPickerColumn from "@/components/dsg/columns/ProdTypeAPickerColumn";
import ProdTypeBPickerColumn from "@/components/dsg/columns/ProdTypeBPickerColumn";
import TaxTypePickerColumn from "@/components/dsg/columns/TaxTypePickerColumn";
import NoDataBox from "@/shared-components/NoDataBox";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createOptionPickerColumn";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import ProdCatLPickerColumn from "../../dsg/columns/ProdCatLPickerColumn";
import ProdCatMPickerColumn from "../../dsg/columns/ProdCatMPickerColumn";
import ProdCatSPickerColumn from "../../dsg/columns/ProdCatSPickerColumn";
import DSGAddRowsToolbar from "../DSGAddRowsToolbar";

const A014Grid = memo((props) => {
	const {
		// bearer,
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
					"ProdData_N",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "品名規格",
				grow: 2,
				disabled: true,
			},
			{
				...createOptionPickerColumn((props) => (
					<ProdCatLPickerColumn name="catL" {...props} />
				)),
				title: "大分類",
				grow: 2,
				disabled: readOnly,
			},
			{
				...createOptionPickerColumn((props) => (
					<ProdCatMPickerColumn name="catM" {...props} />
				)),
				title: "中分類",
				grow: 2,
				disabled: readOnly,
			},
			{
				...createOptionPickerColumn((props) => (
					<ProdCatSPickerColumn name="catS" {...props} />
				)),
				title: "小分類",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"typeA",
					createOptionPickerColumn(ProdTypeAPickerColumn)
				),
				title: "品別",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"typeB",
					createOptionPickerColumn(ProdTypeBPickerColumn)
				),
				title: "品類",
				grow: 2,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"taxType",
					createOptionPickerColumn(TaxTypePickerColumn)
				),
				title: "稅別",
				grow: 2,
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

	if (!data) {
		return false;
	}

	return (
		<Box>
			<DynamicDataSheetGrid
				lockRows
				ref={setGridRef}
				rowKey="CodeID"
				// height={height + (readOnly ? 48 : 0)}
				height={height + 48}
				rowHeight={42}
				value={data}
				onChange={onChange}
				columns={columns}
				disableExpandSelection
				disableContextMenu
				createRow={() => ({
					catL: null,
					catM: null,
					catS: null,
					typeA: null,
					typeB: null,
					taxType: null,
				})}
			/>
		</Box>
	);
});
A014Grid.propTypes = {
	bearer: PropTypes.string,
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

A014Grid.displayName = "A014Grid";
export default A014Grid;
