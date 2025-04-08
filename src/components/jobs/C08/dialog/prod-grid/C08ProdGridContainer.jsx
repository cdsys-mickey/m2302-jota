import { C08Context } from "@/contexts/C08/C08Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import createTooltipExColumn from "@/shared-components/dsg/columns/tooltip-ex/createTooltipExColumn";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { keyColumn } from "react-datasheet-grid";
import { useFormContext } from "react-hook-form";
import C08ProdGrid from "./C08ProdGrid";

export const C08ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c08 = useContext(C08Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return c08.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta,
			onUpdateRow: c08.onUpdateRow,
			onGridChanged: c08.onGridChanged,
			// isRowDeletable: c08.isRowDeletable
		});
	}, [c08, form.getValues, form.setValue, formMeta.gridMeta]);

	const _height = useMemo(() => {
		return height - 370;
	}, [height])

	const prodInfoColumn = useMemo(() => {
		return {
			...keyColumn("tooltip", createTooltipExColumn({
				arrow: true,
				placement: "bottom-end",
			}))
		}
	}, [])

	return (
		<DSGContext.Provider value={{ ...c08.grid, ...formMeta.gridMeta, readOnly: formMeta.readOnly }}>
			<C08ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				// readOnly={!c08.editing || !txiDept}
				readOnly={formMeta.readOnly}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				data={c08.gridData}
				onChange={onChange}
				bearer={auth.token}
				height={_height}
				getRowKey={c08.getRowKey}
				stypeDisabled={c08.stypeDisabled}
				getSPriceClassName={c08.getSPriceClassName}
				getSQtyClassName={c08.getSQtyClassName}
				sprodDisabled={c08.sprodDisabled}
				sqtyDisabled={c08.sqtyDisabled}
				dtypeDisabled={c08.dtypeDisabled}
				overrideSQtyDisabled={c08.overrideSQtyDisabled}
				// buildSelectionChangeHandler={c08.buildSelectionChangeHandler()}
				handleGridCellFocusChange={c08.handleGridCellFocusChange}
				// getRowClassName={c08.getRowClassName}
				createRow={c08.createRow}
				stickyRightColumn={prodInfoColumn}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C08ProdGridContainer.displayName = "C08ProdGridContainer";
