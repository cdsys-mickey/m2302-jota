import { useContext } from "react";
import E01ProdGrid from "./E01ProdGrid";
import { E01Context } from "@/contexts/E01/E01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { tooltipColumn } from "@/shared-components/dsg/columns/tooltip/tooltipColumn";
import { keyColumn } from "react-datasheet-grid";
import createTooltipColumn from "@/shared-components/dsg/columns/tooltip/createTooltipColumn";
import Styles from "@/modules/md-styles";

export const E01ProdGridContainer = (props) => {
	const { ...rest } = props;
	const e01 = useContext(E01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return e01.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			getValues: form.getValues,
			setValue: form.setValue,
			onUpdateRow: e01.onUpdateRow,
			onGridChanged: e01.onGridChanged,
			onCheckRow: e01.onCheckRow,
			isRowDeletable: e01.isRowDeletable
		})
	}, [e01, form.getValues, form.setValue, formMeta.gridMeta])

	const _height = useMemo(() => {
		return height - 430 - (formMeta.readOnly ? Styles.GRID_BOTTOM_TOOLBAR_HEIGHT : 0);
	}, [formMeta.readOnly, height])

	const prodInfoColumn = useMemo(() => {
		return {
			...keyColumn("tooltip", createTooltipColumn({
				arrow: true,
				placement: "bottom-end",
			}))
		}
	}, [])

	return (
		<DSGContext.Provider value={{
			...e01.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<E01ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={e01.grid.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				height={_height}
				getRowKey={e01.getRowKey}
				createRow={e01.createRow}
				stickyRightColumn={prodInfoColumn}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

E01ProdGridContainer.displayName = "E01ProdGridContainer";


