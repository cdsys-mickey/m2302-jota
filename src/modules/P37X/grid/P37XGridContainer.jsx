import DSGAddRowsToolbarEx from "@/components/dsg/DSGAddRowsToolbarEx";
import P37XContext from "@/modules/P37X/P37XContext";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { DSGGrid } from "@/shared-components";
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

const P37XGridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const p37x = useContext(P37XContext);
	// const grid = useContext(DSGContext);
	const gridMeta = useContext(DSGMetaContext);

	const _height = useMemo(() => {
		return height - 494 + (p37x.gridDisabled ? 48 : 0)
	}, [height, p37x.gridDisabled])

	const onChange = useMemo(() => {
		return p37x.grid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: gridMeta,
			onUpdateRow: p37x.onUpdateRow,
			onGridChanged: p37x.onGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [form.getValues, form.setValue, gridMeta, p37x.grid, p37x.onGridChanged, p37x.onUpdateRow]);

	if (!p37x.grid.gridData) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (p37x.grid.gridData?.length === 0 && p37x.cashGridDisabled) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	if (p37x.loadWorking) {
		return (
			<DSGLoading height={_height} />
		);
	}

	if (p37x.loadError) {
		return <FormErrorBox error={p37x.loadError} />
	}

	return (

		<DSGGrid
			ref={gridMeta.setGridRef}
			lockRows={p37x.grid.readOnly}
			columns={gridMeta.columns}
			value={p37x.grid.gridData}
			onChange={onChange}
			onActiveCellChange={gridMeta.handleActiveCellChange}
			addRowsComponent={DSGAddRowsToolbarEx}
			height={_height}
			createRow={p37x.createRow}
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

P37XGridContainer.propTypes = {
	store: PropTypes.bool,
};
P37XGridContainer.displayName = "P37XGridContainer";
export default P37XGridContainer;
