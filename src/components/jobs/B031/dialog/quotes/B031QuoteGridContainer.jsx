import { useContext } from "react";
import B031QuoteGrid from "./B031QuoteGrid";
import { B031Context } from "@/contexts/B031/B031Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export const B031QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b031 = useContext(B031Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return b031.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			getValues: form.getValues,
			onUpdateRow: b031.onUpdateRow,
			onCheckRow: b031.onCheckRow
		})
	}, [b031, form.getValues, formMeta.gridMeta])
	// const onChange = useMemo(() => {
	// 	return b031.buildGridChangeHandlerOld({
	// 		gridMeta: formMeta.gridMeta,
	// 		getValues: form.getValues,
	// 		onUpdateRow: b031.onUpdateRow
	// 	})
	// }, [b031, form.getValues, formMeta.gridMeta])

	return (
		<DSGContext.Provider value={{
			...b031.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<B031QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={b031.grid.gridData}
				onChange={onChange}
				// onChange={b031.buildGridChangeHandler({
				// 	gridMeta: formMeta.gridMeta,
				// 	getValues: form.getValues,
				// 	onUpdateRow: b031.onUpdateRow
				// })}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 240}
				getRowKey={b031.getRowKey}
				createRow={b031.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B031QuoteGridContainer.displayName = "B031QuoteGridContainer";


