import { useContext } from "react";
import G02QuoteGrid from "./G02QuoteGrid";
import { G02Context } from "@/modules/G02/G02Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";

export const G02QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const g02 = useContext(G02Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	// const onChange = useMemo(() => {
	// 	return g02.buildGridChangeHandler({ gridMeta: formMeta.gridMeta })
	// }, [g02, formMeta.gridMeta])

	const onChange = useMemo(() => {
		return g02.buildGridChangeHandler({ gridMeta: formMeta.gridMeta, onUpdateRow: g02.onUpdateRow })
	}, [g02, formMeta.gridMeta])

	const _height = useMemo(() => {
		return height - 330;
	}, [height])

	return (
		<DSGContext.Provider value={{
			...g02.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<G02QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={g02.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={g02.getRowKey}
				createRow={g02.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

G02QuoteGridContainer.displayName = "G02QuoteGridContainer";

