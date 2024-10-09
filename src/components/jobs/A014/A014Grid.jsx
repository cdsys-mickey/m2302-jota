import NoDataBox from "@/shared-components/NoDataBox";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import PropTypes from "prop-types";
import { memo } from "react";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";

const A014Grid = memo((props) => {
	const {
		// bearer,
		// readOnly,
		gridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
	} = props;

	// const columns = useMemo(
	// 	() => [
	// 		{
	// 			...keyColumn(
	// 				"ProdData_N",
	// 				createTextColumn({
	// 					continuousUpdates: false,
	// 				})
	// 			),
	// 			title: "品名規格",
	// 			grow: 2,
	// 			disabled: true,
	// 		},
	// 		// NEW STYLES
	// 		// {
	// 		// 	...keyColumn(
	// 		// 		"catL",
	// 		// 		prodCatLPickerColumn({
	// 		// 			name: "catL",
	// 		// 		})
	// 		// 	),
	// 		// 	title: "大分類",
	// 		// 	grow: 3,
	// 		// 	disabled: readOnly,
	// 		// },
	// 		// {
	// 		// 	...keyColumn(
	// 		// 		"catM",
	// 		// 		prodCatMPickerColumn({
	// 		// 			name: "catM",
	// 		// 		})
	// 		// 	),
	// 		// 	title: "中分類",
	// 		// 	grow: 3,
	// 		// 	disabled: readOnly,
	// 		// },
	// 		// {
	// 		// 	...keyColumn(
	// 		// 		"catS",
	// 		// 		prodCatSPickerColumn({
	// 		// 			name: "catS",
	// 		// 		})
	// 		// 	),
	// 		// 	title: "小分類",
	// 		// 	grow: 3,
	// 		// 	disabled: readOnly,
	// 		// },

	// 		// OLD STYLES
	// 		{
	// 			...optionPickerColumn((props) => (
	// 				<ProdCatLPickerColumn name="catL" {...props} />
	// 			)),
	// 			title: "大分類",
	// 			grow: 3,
	// 			disabled: readOnly,
	// 		},

	// 		{
	// 			...optionPickerColumn((props) => (
	// 				<ProdCatMPickerColumn name="catM" {...props} />
	// 			)),
	// 			title: "中分類",
	// 			grow: 3,
	// 			disabled: readOnly,
	// 		},

	// 		{
	// 			...optionPickerColumn((props) => (
	// 				<ProdCatSPickerColumn name="catS" {...props} />
	// 			)),
	// 			title: "小分類",
	// 			grow: 3,
	// 			disabled: readOnly,
	// 		},
	// 		{
	// 			...keyColumn(
	// 				"typeA",
	// 				optionPickerColumn(ProdTypeAPickerComponent, {
	// 					name: "typeA",
	// 				})
	// 			),
	// 			title: "品別",
	// 			grow: 2,
	// 			disabled: readOnly,
	// 		},
	// 		{
	// 			...keyColumn(
	// 				"typeB",
	// 				optionPickerColumn(ProdTypeBPickerColumn, {
	// 					name: "typeB",
	// 				})
	// 			),
	// 			title: "品類",
	// 			grow: 2,
	// 			disabled: readOnly,
	// 		},
	// 		{
	// 			...keyColumn(
	// 				"taxType",
	// 				optionPickerColumn(TaxTypePickerComponent, {
	// 					name: "taxType",
	// 				})
	// 			),
	// 			title: "稅別",
	// 			grow: 2,
	// 			disabled: readOnly,
	// 		},
	// 	],
	// 	[readOnly]
	// );

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
		<DSGGrid
			lockRows
			ref={gridRef}
			rowKey="ProdID"
			// height={height + (readOnly ? 48 : 0)}
			height={height + 48}
			// rowHeight={42}
			value={data}
			onChange={onChange}
			// columns={columns}
			disableExpandSelection
			disableContextMenu
		// createRow={handleCreateRow}
		/>
	);
});
A014Grid.propTypes = {
	bearer: PropTypes.string,
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	drawerOpen: PropTypes.bool,
	data: PropTypes.array,
	loading: PropTypes.bool,
	height: PropTypes.number,
	onChange: PropTypes.func,
	isPersisted: PropTypes.func,
	// handleActiveCellChange: PropTypes.func,
	// handleCreateRow: PropTypes.func,
};

A014Grid.displayName = "A014Grid";
export default A014Grid;
