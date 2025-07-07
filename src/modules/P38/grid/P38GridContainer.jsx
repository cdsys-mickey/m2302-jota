import DSGAddRowsToolbarEx from "@/components/dsg/DSGAddRowsToolbarEx";
import P38Context from "@/modules/P38/P38Context";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import DSGLoading from "@/shared-components/dsg/DSGLoading";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import DSGMetaContext from "@/shared-contexts/datasheet-grid/DSGMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const P38GridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const p38 = useContext(P38Context);
	// const grid = useContext(DSGContext);
	const gridMeta = useContext(DSGMetaContext);

	const _height = useMemo(() => {
		return height - 494 + (p38.gridDisabled ? 48 : 0)
	}, [height, p38.gridDisabled])

	const onChange = useMemo(() => {
		return p38.grid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: gridMeta,
			onUpdateRow: p38.onUpdateRow,
			onGridChanged: p38.onGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [form.getValues, form.setValue, gridMeta, p38.grid, p38.onGridChanged, p38.onUpdateRow]);

	if (!p38.grid.gridData) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (p38.grid.gridData?.length === 0 && p38.cashGridDisabled) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	if (p38.loadWorking) {
		return (
			<DSGLoading height={_height} />
		);
	}

	if (p38.loadError) {
		return <FormErrorBox error={p38.loadError} />
	}

	return (

		<DSGGrid
			ref={gridMeta.setGridRef}
			lockRows={p38.grid.readOnly}
			columns={gridMeta.columns}
			value={p38.grid.gridData}
			onChange={onChange}
			onActiveCellChange={gridMeta.handleActiveCellChange}
			addRowsComponent={DSGAddRowsToolbarEx}
			height={_height}
			createRow={p38.createRow}
			disableExpandSelection
			contextMenuComponent={ContextMenu}
			slotProps={{
				box: {
					// mt: 0.5
				}
			}}
			{...rest}
		/>
	);
};

P38GridContainer.propTypes = {
	store: PropTypes.bool,
};
P38GridContainer.displayName = "P38GridContainer";
export default P38GridContainer;
