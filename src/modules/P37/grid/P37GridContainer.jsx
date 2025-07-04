import DSGAddRowsToolbarEx from "@/components/dsg/DSGAddRowsToolbarEx";
import P37Context from "@/modules/P37/P37Context";
import { createCheckboxColumn } from "@/shared-components/dsg/columns/checkbox/createCheckboxColumn";
import { createTextColumnEx } from "@/shared-components/dsg/columns/text/createTextColumnEx";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { DSGLastCellBehavior } from "@/shared-hooks/dsg/DSGLastCellBehavior";
import { useDSGMeta } from "@/shared-hooks/dsg/useDSGMeta";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { useFormContext } from "react-hook-form";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const P37GridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const p37 = useContext(P37Context);

	const readOnly = useMemo(() => {
		return p37.grid.readOnly;
	}, [p37.grid.readOnly])

	const columns = useMemo(
		() => [
			{
				...keyColumn(
					"SDnCp",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "≧ 下限值",
				disabled: readOnly,
				// minWidth: 120,
				// maxWidth: 130,
				grow: 1,
			},
			{
				...keyColumn(
					"SUpCp",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "≦ 上限值",
				disabled: readOnly,
				// minWidth: 120,
				// maxWidth: 130,
				grow: 1,
			},
			{
				...keyColumn(
					"SDrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "司機佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
			{
				...keyColumn(
					"STrvCms",
					createTextColumnEx({
						alignRight: true
					})
				),
				title: "旅行社佣金(%)",
				disabled: readOnly,
				minWidth: 130,
				maxWidth: 130,
			},
		],
		[readOnly]
	);

	const gridMeta = useDSGMeta({
		data: p37.grid.gridData,
		columns: columns,
		skipDisabled: true,
		lastCell: DSGLastCellBehavior.CREATE_ROW,
		grid: p37.grid
	});

	const _height = useMemo(() => {
		return height - 494 + (p37.gridDisabled ? 48 : 0)
	}, [height, p37.gridDisabled])

	const onChange = useMemo(() => {
		return p37.grid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: gridMeta,
			onUpdateRow: p37.onUpdateRow,
			onGridChanged: p37.onGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [form.getValues, form.setValue, gridMeta, p37.grid, p37.onGridChanged, p37.onUpdateRow]);

	if (!p37.grid.gridData) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (p37.grid.gridData?.length === 0 && p37.cashGridDisabled) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	if (p37.loadWorking) {
		return (
			<DSGLoading height={_height} />
		);
	}

	if (p37.loadError) {
		return <FormErrorBox error={p37.loadError} />
	}

	return (
		<DSGContext.Provider
			value={{
				...p37.grid,
				...gridMeta,
				readOnly: !p37.editing
			}}>
			<DSGGrid
				ref={gridMeta.setGridRef}
				lockRows={p37.grid.readOnly}
				columns={columns}
				value={p37.grid.gridData}
				onChange={onChange}
				onActiveCellChange={gridMeta.handleActiveCellChange}
				addRowsComponent={DSGAddRowsToolbarEx}
				height={_height}
				createRow={p37.createRow}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				slotProps={{
					box: {
						// mt: 0.5
					}
				}}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

P37GridContainer.propTypes = {
	store: PropTypes.bool,
};
P37GridContainer.displayName = "P37GridContainer";
export default P37GridContainer;