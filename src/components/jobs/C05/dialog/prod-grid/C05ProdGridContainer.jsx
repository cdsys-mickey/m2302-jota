import { useContext } from "react";
import C05ProdGrid from "./C05ProdGrid";
import { C05Context } from "@/contexts/C05/C05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";

export const C05ProdGridContainer = (props) => {
	const { ...rest } = props;
	const auth = useContext(AuthContext);
	const c05 = useContext(C05Context);
	const formMeta = useContext(FormMetaContext);
	const { height } = useWindowSize();
	const form = useFormContext();

	// const onChange = useMemo(() => {
	// 	return c05.buildGridChangeHandler({
	// 		getValues: form.getValues,
	// 		setValue: form.setValue,
	// 		gridMeta: formMeta.gridMeta
	// 	});
	// }, [c05, form.getValues, form.setValue, formMeta.gridMeta]);
	const onChange = useMemo(() => {
		return c05.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta,
			onUpdateRow: c05.onUpdateRow,
			onGridChanged: c05.onGridChanged
		});
	}, [c05, form.getValues, form.setValue, formMeta.gridMeta]);

	const _height = useMemo(() => {
		return c05.editing ? height - 418 : height - 410;
	}, [c05.editing, height])

	return (
		<DSGContext.Provider value={{
			...c05.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<C05ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={c05.gridData}
				bearer={auth.token}
				height={_height}
				getRowKey={c05.getRowKey}
				createRow={c05.createRow}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C05ProdGridContainer.displayName = "C05ProdGridContainer";
