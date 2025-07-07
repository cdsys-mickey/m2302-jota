import DSGAddRowsToolbarEx from "@/components/dsg/DSGAddRowsToolbarEx";
import P37Context from "@/modules/P37/P37Context";
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

const P37GridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const p37 = useContext(P37Context);
	// const grid = useContext(DSGContext);
	const gridMeta = useContext(DSGMetaContext);

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

		<DSGGrid
			ref={gridMeta.setGridRef}
			lockRows={p37.grid.readOnly}
			columns={gridMeta.columns}
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
	);
};

P37GridContainer.propTypes = {
	store: PropTypes.bool,
};
P37GridContainer.displayName = "P37GridContainer";
export default P37GridContainer;