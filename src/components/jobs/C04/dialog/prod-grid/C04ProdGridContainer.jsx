import { C04Context } from "@/contexts/C04/C04Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import C04ProdGrid from "./C04ProdGrid";

export const C04ProdGridContainer = (props) => {
	const { ...rest } = props;
	const c04 = useContext(C04Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	// const onChange = useMemo(() => {
	// 	return c04.buildGridChangeHandler({
	// 		getValues: form.getValues,
	// 		setValue: form.setValue,
	// 		gridMeta: formMeta.gridMeta
	// 		// handleRefreshAmt: c04.handleRefreshAmt,
	// 	});
	// }, [c04, form.getValues, form.setValue, formMeta.gridMeta]);
	const onChange = useMemo(() => {
		return c04.handleGridChangeAsync({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta
			// handleRefreshAmt: c04.handleRefreshAmt,
		});
	}, [c04, form.getValues, form.setValue, formMeta.gridMeta]);

	return (
		<DSGContext.Provider value={{
			...c04.grid,
			...formMeta.gridMeta,
			readOnly: !c04.editing
		}}>
			<C04ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				// readOnly={!c04.editing || !supplier || !rstDate}
				readOnly={formMeta.readOnly}
				data={c04.gridData}
				bearer={auth.token}
				height={height - 390}
				getRowKey={c04.getRowKey}
				prodDisabled={c04.prodDisabled}
				spriceDisabled={c04.spriceDisabled}
				getSPriceClassName={c04.getSPriceClassName}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				createRow={c04.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

C04ProdGridContainer.displayName = "C04ProdGridContainer";
