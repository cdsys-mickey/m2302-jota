import { useContext } from "react";
import B05QuoteGrid from "./B05QuoteGrid";
import { B05Context } from "@/contexts/B05/B05Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";

export const B05QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b05 = useContext(B05Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	// const onChange = useMemo(() => {
	// 	return b05.buildGridChangeHandler({ gridMeta: formMeta.gridMeta })
	// }, [b05, formMeta.gridMeta])

	const onChange = useMemo(() => {
		return b05.buildGridChangeHandler({ gridMeta: formMeta.gridMeta, onUpdateRow: b05.onUpdateRow })
	}, [b05, formMeta.gridMeta])

	return (
		<DSGContext.Provider value={{
			...b05.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<B05QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={b05.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 330}
				getRowKey={b05.getRowKey}
				createRow={b05.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B05QuoteGridContainer.displayName = "B05QuoteGridContainer";
