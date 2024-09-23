import { useContext } from "react";
import B012QuoteGrid from "./B012QuoteGrid";
import { B012Context } from "@/contexts/B012/B012Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export const B012QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b012 = useContext(B012Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return b012.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			getValues: form.getValues,
			onUpdateRow: b012.onUpdateRow,
			onCheckRow: b012.onCheckRow
		})
	}, [b012, form.getValues, formMeta.gridMeta])
	// const onChange = useMemo(() => {
	// 	return b012.buildGridChangeHandlerOld({
	// 		gridMeta: formMeta.gridMeta,
	// 		getValues: form.getValues,
	// 		onUpdateRow: b012.onUpdateRow
	// 	})
	// }, [b012, form.getValues, formMeta.gridMeta])

	return (
		<DSGContext.Provider value={{
			...b012.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<B012QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={b012.grid.gridData}
				onChange={onChange}
				// onChange={b012.buildGridChangeHandler({
				// 	gridMeta: formMeta.gridMeta,
				// 	getValues: form.getValues,
				// 	onUpdateRow: b012.onUpdateRow
				// })}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 240}
				getRowKey={b012.getRowKey}
				createRow={b012.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B012QuoteGridContainer.displayName = "B012QuoteGridContainer";


