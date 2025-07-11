import { useContext } from "react";
import D07ProdGrid from "./D07ProdGrid";
import { D07Context } from "@/contexts/D07/D07Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useFormContext, useWatch } from "react-hook-form";
import DSGBox from "../../../../../shared-components/dsg/DSGBox";
import { useMemo } from "react";
import { FormMetaContext } from "@/shared-components/form-meta/FormMetaContext";
import { DSGContext } from "@/shared-contexts/datasheet-grid/DSGContext";

export const D07ProdGridContainer = (props) => {
	const { ...rest } = props;
	const d07 = useContext(D07Context);
	const auth = useContext(AuthContext);
	const { height } = useWindowSize();
	const form = useFormContext();
	const formMeta = useContext(FormMetaContext);

	const onChange = useMemo(() => {
		return d07.buildGridChangeHandler({
			getValues: form.getValues,
			setValue: form.setValue,
			gridMeta: formMeta.gridMeta
			// handleRefreshAmt: d07.handleRefreshAmt,
		});
	}, [d07, form.getValues, form.setValue, formMeta.gridMeta]);

	const _height = useMemo(() => {
		return height - 258
	}, [height])

	return (
		<DSGContext.Provider value={{
			...d07.grid,
			...formMeta.gridMeta,
			readOnly: formMeta.readOnly
		}}>
			<D07ProdGrid
				gridRef={formMeta.gridMeta.setGridRef}
				readOnly={formMeta.readOnly}
				data={d07.gridData}
				onChange={onChange}
				onActiveCellChange={formMeta.gridMeta.handleActiveCellChange}
				bearer={auth.token}
				height={_height}
				getRowKey={d07.getRowKey}
				createRow={d07.createRow}
				{...rest}
			/>
		</DSGContext.Provider>
	);
};

D07ProdGridContainer.displayName = "D07ProdGridContainer";
