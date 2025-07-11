import { useContext } from "react";
import F01QuoteGrid from "./F01QuoteGrid";
import { F01Context } from "@/modules/F01/F01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { useMemo } from "react";

export const F01QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const f01 = useContext(F01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	// const onChange = useMemo(() => {
	// 	return f01.buildGridChangeHandler({ gridMeta: formMeta.gridMeta })
	// }, [f01, formMeta.gridMeta])

	const onChange = useMemo(() => {
		return f01.buildGridChangeHandler({ gridMeta: formMeta.gridMeta, onUpdateRow: f01.onUpdateRow })
	}, [f01, formMeta.gridMeta])

	const _height = useMemo(() => {
		return height - 310;
	}, [height])

	return (
		<DSGContext.Provider value={{
			...f01.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<F01QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={f01.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={f01.getRowKey}
				createRow={f01.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

F01QuoteGridContainer.displayName = "F01QuoteGridContainer";

