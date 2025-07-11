import { useContext } from "react";
import C09ProdGrid from "./C09ProdGrid";
import { C09Context } from "@/contexts/C09/C09Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "@/shared-components/dsg/DSGBox";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const C09ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c09 = useContext(C09Context);
	const auth = useContext(AuthContext);
	const { height: windowHeight } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const height = useMemo(() => {
		return windowHeight - 366;
	}, [windowHeight]);

	const onChange = useMemo(() => {
		return c09.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta
		});
	}, [c09, form.getValues, form.setValue, formMeta.gridMeta]);

	return (
		<DSGContext.Provider value={{
			...c09.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<C09ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={c09.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height}
				getRowKey={c09.getRowKey}
				// dtypeDisabled={c09.dtypeDisabled}
				// stypeDisabled={c09.stypeDisabled}
				// sprodDisabled={c09.sprodDisabled}
				// sqtyDisabled={c09.sqtyDisabled}
				// getSPriceClassName={c09.getSPriceClassName}
				createRow={c09.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C09ProdGridContainer.displayName = "C09ProdGridContainer";
