import { useContext } from "react";
import B011QuoteGrid from "./B011QuoteGrid";
import { B011Context } from "@/contexts/B011/B011Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export const B011QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b011 = useContext(B011Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return b011.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			getValues: form.getValues,
			onUpdateRow: b011.onUpdateRow,
			onCheckRow: b011.onCheckRow
		})
	}, [b011, form.getValues, formMeta.gridMeta])
	// const onChange = useMemo(() => {
	// 	return b011.buildGridChangeHandlerOld({
	// 		gridMeta: formMeta.gridMeta,
	// 		getValues: form.getValues,
	// 		onUpdateRow: b011.onUpdateRow
	// 	})
	// }, [b011, form.getValues, formMeta.gridMeta])

	return (
		<DSGContext.Provider value={{
			...b011.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<B011QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={b011.grid.gridData}
				onChange={onChange}
				// onChange={b011.buildGridChangeHandler({
				// 	gridMeta: formMeta.gridMeta,
				// 	getValues: form.getValues,
				// 	onUpdateRow: b011.onUpdateRow
				// })}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 240}
				getRowKey={b011.getRowKey}
				createRow={b011.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B011QuoteGridContainer.displayName = "B011QuoteGridContainer";

