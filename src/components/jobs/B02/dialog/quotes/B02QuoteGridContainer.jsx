import { useContext } from "react";
import B02QuoteGrid from "./B02QuoteGrid";
import { B02Context } from "@/contexts/B02/B02Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useMemo } from "react";
import { BContext } from "@/contexts/B/BContext";
import { B04Context } from "@/contexts/B04/B04Context";

export const B02QuoteGridContainer = (props) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return b02.buildGridChangeHandler({ gridMeta: formMeta.gridMeta })
	}, [b02, formMeta.gridMeta])

	return (
		<DSGContext.Provider value={{
			...b02.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<B02QuoteGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={b02.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 330}
				getRowKey={b02.getRowKey}
				createRow={b02.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

B02QuoteGridContainer.displayName = "B02QuoteGridContainer";


