import DSGAddRowsToolbarEx from "@/components/dsg/DSGAddRowsToolbarEx";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { P35Context } from "@/modules/P35/P35Context";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const P35GridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const p35 = useContext(P35Context);
	const formMeta = useContext(FormMetaContext);


	const _height = useMemo(() => {
		return height - 564 + (p35.gridDisabled ? 48 : 0)
	}, [height, p35.gridDisabled])

	const onChange = useMemo(() => {
		return p35.grid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta,
			onUpdateRow: p35.onUpdateRow,
			onGridChanged: p35.onGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [form.getValues, form.setValue, formMeta.gridMeta, p35.grid, p35.onGridChanged, p35.onUpdateRow]);

	if (!p35.grid.gridData) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (p35.grid.gridData?.length === 0 && p35.cashGridDisabled) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DSGContext.Provider
			value={{
				...p35.grid,
				...formMeta.gridMeta,
				readOnly: !p35.editing
			}}>
			<DSGGrid
				ref={formMeta.gridMeta.setGridRef}
				lockRows={p35.gridDisabled}
				columns={formMeta.gridMeta.columns}
				value={p35.grid.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				addRowsComponent={DSGAddRowsToolbarEx}
				height={_height}
				createRow={p35.createRow}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				slotProps={{
					box: {
						mt: -1.5
					}
				}}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

P35GridContainer.propTypes = {
	store: PropTypes.bool,
};
P35GridContainer.displayName = "P35GridContainer";
export default P35GridContainer;