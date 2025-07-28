import { createAddRowsComponentEx } from "@/shared-components/dsg/add-rows/createAddRowsComponentEx";
import { createDSGContextMenuComponent } from "@/shared-components/dsg/context-menu/createDSGContextMenuComponent";
import { DSGGrid } from "@/shared-components/dsg/DSGGrid";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { Typography, useTheme, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { P42Context } from "../../P42Context";
import P42RangeRow1Container from "./P42RangeRow1/P42RangeRow1Container";

const ContextMenu = createDSGContextMenuComponent({
	filterItem: (item) => ["DELETE_ROW", "DELETE_ROWS"].includes(item.type),
});

const P42RangeGridContainer = (props) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const form = useFormContext();
	const p42 = useContext(P42Context);
	const formMeta = useContext(FormMetaContext);
	const theme = useTheme();
	const lgOrUp = useMediaQuery(theme.breakpoints.up('lg'));
	const _addRowsComponent = useMemo(() => {
		return createAddRowsComponentEx({
			hideNumberField: true,
			RightComponent: P42RangeRow1Container
		})
	}, [])

	const _height = useMemo(() => {
		return lgOrUp ? height - 478 : 200
	}, [height, lgOrUp])



	const onChange = useMemo(() => {
		return p42.rangeGrid.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.rangeGridMeta,
			onUpdateRow: p42.onUpdateRow,
			onGridChanged: p42.onGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [form.getValues, form.setValue, formMeta.rangeGridMeta, p42.onGridChanged, p42.onUpdateRow, p42.rangeGrid]);

	if (!p42.rangeGrid.gridData) {
		return (
			<Typography variant="body2" color="text.secondary">
				(未填寫)
			</Typography>
		);
	}

	if (p42.rangeGrid.gridData?.length === 0 && p42.cashGridDisabled) {
		return (
			<Typography variant="body2" color="text.secondary">
				(空白)
			</Typography>
		);
	}

	return (
		<DSGContext.Provider
			value={{
				...p42.rangeGrid,
				...formMeta.rangeGridMeta,
				readOnly: !p42.editing
			}}>
			<DSGGrid
				ref={formMeta.rangeGridMeta.setGridRef}
				lockRows={p42.gridDisabled}
				columns={formMeta.rangeGridMeta.columns}
				value={p42.rangeGrid.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.rangeGridMeta.handleActiveCellChange}
				// addRowsComponent={DSGAddRowsToolbarEx}
				addRowsComponent={_addRowsComponent}
				height={_height}
				createRow={p42.createRow}
				disableExpandSelection
				contextMenuComponent={ContextMenu}
				{...rest}
			>
				{!p42.editing && <P42RangeRow1Container />}
			</DSGGrid>
		</DSGContext.Provider>
	);
};

P42RangeGridContainer.propTypes = {
	store: PropTypes.bool,
};
P42RangeGridContainer.displayName = "P42RangeGridContainer";
export default P42RangeGridContainer;
