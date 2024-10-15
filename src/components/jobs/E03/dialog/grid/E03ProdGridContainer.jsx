import { useContext } from "react";
import E03ProdGrid from "./E03ProdGrid";
import { E03Context } from "@/contexts/E03/E03Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export const E03ProdGridContainer = (props) => {
	const { ...rest } = props;
	const e03 = useContext(E03Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return e03.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			getValues: form.getValues,
			setValue: form.setValue,
			onUpdateRow: e03.onUpdateRow,
			onGridChanged: e03.onGridChanged,
			onCheckRow: e03.onCheckRow
		})
	}, [e03, form.getValues, form.setValue, formMeta.gridMeta])

	const _height = useMemo(() => {
		return formMeta.readOnly ? height - 490 : height - 454;
	}, [formMeta.readOnly, height])

	return (
		<DSGContext.Provider value={{
			...e03.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<E03ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={e03.grid.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={e03.getRowKey}
				createRow={e03.createRow}
				getTooltip={e03.getTooltip}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

E03ProdGridContainer.displayName = "E03ProdGridContainer";




