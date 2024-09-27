import { useContext } from "react";
import E01ProdGrid from "./E01ProdGrid";
import { E01Context } from "@/contexts/E01/E01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

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
			onUpdateRow: e01.onUpdateRow,
			onCheckRow: e01.onCheckRow
		})
	}, [e01, form.getValues, formMeta.gridMeta])

	const _height = useMemo(() => {
		return formMeta.readOnly ? height - 460 : height - 414;
	}, [formMeta.readOnly, height])

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
				bearer={auth.token}
				height={_height}
				getRowKey={e01.getRowKey}
				createRow={e01.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

E01ProdGridContainer.displayName = "E01ProdGridContainer";


