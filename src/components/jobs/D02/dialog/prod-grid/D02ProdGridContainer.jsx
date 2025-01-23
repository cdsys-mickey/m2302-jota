import { D02Context } from "@/contexts/D02/D02Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import D02ProdGrid from "./D02ProdGrid";

export const D02ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d02 = useContext(D02Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	// const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return d02.buildGridChangeHandler({
			// getValues: form.getValues,
			// setValue: form.setValue,
			// handleRefreshAmt: d02.handleRefreshAmt,
			gridMeta: formMeta.gridMeta
		});
	}, [d02, formMeta.gridMeta]);

	const _height = useMemo(() => {
		return height - 318;
	}, [height])

	return (
		<DSGContext.Provider value={{
			...d02.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<D02ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				// readOnly={!d02.editing}
				readOnly={formMeta.readOnly}
				data={d02.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={d02.getRowKey}
				createRow={d02.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

D02ProdGridContainer.displayName = "D02ProdGridContainer";
