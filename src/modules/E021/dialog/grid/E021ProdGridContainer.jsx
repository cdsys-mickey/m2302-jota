import { useContext } from "react";
import E021ProdGrid from "./E021ProdGrid";
import { E021Context } from "@/modules/E021/E021Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { keyColumn } from "react-datasheet-grid";
import createTooltipExColumn from "@/shared-components/dsg/columns/tooltip-ex/createTooltipExColumn";
import MuiStyles from "@/shared-modules/MuiStyles";

export const E021ProdGridContainer = (props) => {
	const { ...rest } = props;
	const e021 = useContext(E021Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return e021.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			getValues: form.getValues,
			setValue: form.setValue,
			onUpdateRow: e021.onUpdateRow,
			onGridChanged: e021.onGridChanged,
			onCheckRow: e021.onCheckRow
		})
	}, [e021, form.getValues, form.setValue, formMeta.gridMeta])

	const _height = useMemo(() => {
		return height - 475 - (formMeta.readOnly ? MuiStyles.GRID_BOTTOM_TOOLBAR_HEIGHT : 0);
	}, [formMeta.readOnly, height])

	const prodInfoColumn = useMemo(() => {
		return {
			...keyColumn("tooltip", createTooltipExColumn({
				arrow: true,
				placement: "left-start",
			}))
		}
	}, [])

	return (
		<DSGContext.Provider value={{
			...e021.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<E021ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={e021.grid.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={e021.getRowKey}
				createRow={e021.createRow}
				stickyRightColumn={prodInfoColumn}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

E021ProdGridContainer.displayName = "E021ProdGridContainer";



