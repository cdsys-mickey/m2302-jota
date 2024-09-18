import { useContext } from "react";
import B04QuoteGrid from "./B04QuoteGrid";
import { B04Context } from "@/contexts/B04/B04Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";

export const B04QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b04 = useContext(B04Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return b04.buildGridChangeHandler({ gridMeta: formMeta.gridMeta })
	}, [b04, formMeta.gridMeta])

	return (
		<DSGContext.Provider value={{
			...b04.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<B04QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={b04.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 330}
				getRowKey={b04.getRowKey}
				createRow={b04.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B04QuoteGridContainer.displayName = "B04QuoteGridContainer";



