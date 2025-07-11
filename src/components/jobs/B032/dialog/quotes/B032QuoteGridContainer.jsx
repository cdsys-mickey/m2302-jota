import { useContext } from "react";
import B032QuoteGrid from "./B032QuoteGrid";
import { B032Context } from "@/contexts/B032/B032Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { B012Context } from "@/contexts/B012/B012Context";
import { BContext } from "@/contexts/B/BContext";

export const B032QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const b032 = useContext(b.forNew ? B032Context : B012Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);
	const form = useFormContext();

	const onChange = useMemo(() => {
		return b032.buildGridChangeHandler({
			gridMeta: formMeta.gridMeta,
			getValues: form.getValues,
			onUpdateRow: b032.onUpdateRow,
			onCheckRow: b032.onCheckRow
		})
	}, [b032, form.getValues, formMeta.gridMeta])
	// const onChange = useMemo(() => {
	// 	return b032.buildGridChangeHandlerOld({
	// 		gridMeta: formMeta.gridMeta,
	// 		getValues: form.getValues,
	// 		onUpdateRow: b032.onUpdateRow
	// 	})
	// }, [b032, form.getValues, formMeta.gridMeta])

	return (
		<DSGContext.Provider value={{
			...b032.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<B032QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={b032.grid.gridData}
				onChange={onChange}
				// onChange={b032.buildGridChangeHandler({
				// 	gridMeta: formMeta.gridMeta,
				// 	getValues: form.getValues,
				// 	onUpdateRow: b032.onUpdateRow
				// })}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 244}
				getRowKey={b032.getRowKey}
				createRow={b032.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B032QuoteGridContainer.displayName = "B032QuoteGridContainer";



