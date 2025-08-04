import DSGAddRowsToolbarEx from "@/components/dsg/DSGAddRowsToolbarEx";
import { DSGGrid } from "@/shared-components";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { P34Context } from "../../P34Context";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const P34GridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const p34 = useContext(P34Context);
	const formMeta = useContext(FormMetaContext);


	const _height = useMemo(() => {
		return height - 530 + (p34.gridDisabled ? 48 : 0)
	}, [height, p34.gridDisabled])



	const onChange = useMemo(() => {
		return p34.grid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta,
			onUpdateRow: p34.onUpdateRow,
			onGridChanged: p34.onGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [form.getValues, form.setValue, formMeta.gridMeta, p34.grid, p34.onGridChanged, p34.onUpdateRow]);

	if (!p34.grid.gridData) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (p34.grid.gridData?.length === 0 && p34.cashGridDisabled) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DSGContext.Provider
			value={{
				...p34.grid,
				...formMeta.gridMeta,
				readOnly: !p34.editing
			}}>
			<DSGGrid
				ref={formMeta.gridMeta.setGridRef}
				lockRows={p34.gridDisabled}
				columns={formMeta.gridMeta.columns}
				value={p34.grid.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				addRowsComponent={DSGAddRowsToolbarEx}
				height={_height}
				createRow={p34.createRow}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

P34GridContainer.propTypes = {
	store: PropTypes.bool,
};
P34GridContainer.displayName = "P34GridContainer";
export default P34GridContainer;