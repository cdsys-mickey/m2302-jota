import { useContext } from "react";
import P14QuoteGrid from "./P14QuoteGrid";
import { P14Context } from "@/modules/P14/P14Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";

export const P14QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const p14 = useContext(P14Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	// const onChange = useMemo(() => {
	// 	return p14.buildGridChangeHandler({ gridMeta: formMeta.gridMeta })
	// }, [p14, formMeta.gridMeta])

	const onChange = useMemo(() => {
		return p14.buildGridChangeHandler({ gridMeta: formMeta.gridMeta, onUpdateRow: p14.onUpdateRow })
	}, [p14, formMeta.gridMeta])

	const _height = useMemo(() => {
		return height - 310;
	}, [height])

	return (
		<DSGContext.Provider value={{
			...p14.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<P14QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={p14.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={p14.getRowKey}
				createRow={p14.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

P14QuoteGridContainer.displayName = "P14QuoteGridContainer";


