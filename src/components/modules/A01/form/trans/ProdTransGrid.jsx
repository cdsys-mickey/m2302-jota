import { createFloatColumn } from "@/shared-components/dsg/columns/float/createFloatColumn";
import { createDSGContextMenu } from "@/shared-components/dsg/context-menu/useDSGContextMenu";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { DynamicDataSheetGrid, keyColumn } from "react-datasheet-grid";
import Depts from "@/modules/md-depts";
import { createWebApiOptionPickerColumn } from "@/shared-components/dsg/columns/option-picker/createWebApiOptionPickerColumn";
import DSGAddRowsToolbar from "@/components/modules/DSGAddRowsToolbar";

const ContextMenu = createDSGContextMenu({
	filterItem: (item) => ["DELETE_ROW"].includes(item.type),
});

const ProdTransGrid = memo((props) => {
	const {
		readOnly = false,
		gridRef,
		data,
		handleGridChange,
		height = 600,
		bearer,
		...rest
	} = props;

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"dept",
					createWebApiOptionPickerColumn({
						url: "v1/ou/depts",
						bearer: bearer,
						getOptionLabel: Depts.getOptionLabel,
						isOptionEqualToValue: Depts.isOptionEqualToValue,
						getData: (p) => p["data"],
					})
				),
				title: "門市",
				grow: 6,
				disabled: readOnly,
			},
			{
				...keyColumn("SCost", createFloatColumn(2)),
				title: "調撥成本",
				minWidth: 90,
				grow: 1,
				disabled: readOnly,
			},
		],
		[bearer, readOnly]
	);

	if (!data) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (data?.length === 0 && readOnly) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DynamicDataSheetGrid
			ref={gridRef}
			rowKey="id"
			lockRows={readOnly}
			height={height + (readOnly ? 48 : 0)}
			rowHeight={42}
			value={data}
			onChange={handleGridChange}
			columns={columns}
			addRowsComponent={DSGAddRowsToolbar}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			createRow={() => ({
				dept: null,
				SCost: "",
			})}
		/>
	);
});

ProdTransGrid.propTypes = {
	readOnly: PropTypes.bool,
	gridRef: PropTypes.func,
	data: PropTypes.array,
};

ProdTransGrid.displayName = "ProdTransGrid";
export default ProdTransGrid;
