import { D01Context } from "@/contexts/D01/D01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";
import { FormMetaContext } from "@/shared-contexts/form-meta/FormMetaContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import D01ProdGrid from "./D01ProdGrid";

export const D01ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d01 = useContext(D01Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return d01.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta,
			onUpdateRow: d01.onUpdateRow,
			// handleRefreshAmt: d01.handleRefreshAmt,
		});
	}, [d01, form.getValues, form.setValue, formMeta.gridMeta]);

	return (
		<DSGContext.Provider value={{ ...d01.grid, ...formMeta.gridMeta, readOnly: formMeta.readOnly }}>
			<D01ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={d01.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={height - 310}
				getRowKey={d01.getRowKey}
				createRow={d01.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

D01ProdGridContainer.displayName = "D01ProdGridContainer";
