import { D06Context } from "@/contexts/D06/D06Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import D06ProdGrid from "./D06ProdGrid";

export const D06ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d06 = useContext(D06Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return d06.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta
			// handleRefreshAmt: d06.handleRefreshAmt,
		});
	}, [d06, form.getValues, form.setValue, formMeta.gridMeta]);

	const _height = useMemo(() => {
		return height - 368
	}, [height])

	return (
		<DSGContext.Provider value={{
			...d06.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<D06ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={d06.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={d06.getRowKey}
				createRow={d06.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

D06ProdGridContainer.displayName = "D06ProdGridContainer";
