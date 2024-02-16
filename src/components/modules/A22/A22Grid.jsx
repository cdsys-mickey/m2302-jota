import DSGAddRowsToolbar from "@/components/dsg/DSGAddRowsToolbar";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import { createOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createOptionPickerColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import {
	DynamicDataSheetGrid,
	createTextColumn,
	keyColumn,
} from "react-datasheet-grid";
import NoDataBox from "../../../shared-components/NoDataBox";
import { createIntColumn } from "../../../shared-components/dsg/columns/float/createIntColumn";
import A22GridProdPickerColumn from "./columns/A22GridProdPickerColumn";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const A22Grid = memo((props) => {
	const {
		readOnly,
		setGridRef,
		data,
		loading,
		height = 300,
		// METHODS
		onChange,
		bearer,
		getRowKey,
		handleCreateRow,
	} = props;

	const columns = useMemo(
		() => [
			// {
			// 	...keyColumn(
			// 		"ProdID",
			// 		createTextColumn({
			// 			continuousUpdates: false,
			// 		})
			// 	),
			// 	disabled: true,
			// 	grow: 2,
			// 	title: "商品代碼",
			// },
			{
				// ...keyColumn(
				// 	"prod",
				// 	createWebApiOptionPickerColumn({
				// 		url: "v1/prods",
				// 		queryString: QueryString.stringify({
				// 			tp: 50,
				// 			ps: 1,
				// 		}),
				// 		bearer: bearer,
				// 		queryParam: "qs",
				// 		getOptionLabel: Prods.getOptionLabel,
				// 		isOptionEqualToValue: Prods.isOptionEqualToValue,
				// 		filterByServer: true,
				// 		size: "small",
				// 		getData: (p) => p["data"],
				// 		queryRequired: true,
				// 		placeholder: "商品編號",
				// 		typeToSearchText: "請輸入編號名稱或條碼進行搜尋",
				// 	})
				// ),
				...createOptionPickerColumn((props) => (
					<A22GridProdPickerColumn name="prod" {...props} />
				)),
				title: "商品",
				grow: 8,
				disabled: readOnly,
			},
			{
				...keyColumn(
					"Barcode",
					createTextColumn({
						continuousUpdates: false,
					})
				),
				title: "條碼",
				grow: 3,
				disabled: true,
			},
			// {
			// 	...keyColumn(
			// 		"PackData",
			// 		createTextColumn({
			// 			continuousUpdates: false,
			// 		})
			// 	),
			// 	title: "包裝單位",
			// 	grow: 1,
			// 	disabled: readOnly,
			// },
			{
				...keyColumn("Qty", createIntColumn()),
				title: "張數",
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

	if (!data) {
		return false;
	}

	return (
		<Box>
			<DynamicDataSheetGrid
				lockRows={readOnly}
				ref={setGridRef}
				// rowKey="ProdID"
				rowKey={getRowKey}
				height={height + (readOnly ? 48 : 0)}
				rowHeight={42}
				value={data}
				onChange={onChange}
				columns={columns}
				addRowsComponent={DSGAddRowsToolbar}
				disableExpandSelection
				// disableContextMenu
				contextMenuComponent={ContextMenu}
				createRow={handleCreateRow}
			/>
		</Box>
	);
});
A22Grid.propTypes = {
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

A22Grid.displayName = "A22Grid";
export default A22Grid;
